export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { generateOrderEmail } from '@/lib/email-templates';


export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Received Notification Request:", body); // DEBUG LOG

        const { orderId, amount, paymentMethod, customer, items, transactionId } = body;

        // 0. Save Order to Database
        try {
            await dbConnect();
            // Check if order already exists (idempotency)
            const existingOrder = await Order.findOne({ orderId: orderId });
            if (!existingOrder) {
                const newOrder = new Order({
                    orderId,
                    customer,
                    items,
                    amount,
                    paymentMethod,
                    status: 'Processing',
                    transactionId // Save transaction ID if model supports it (schema needs update if strict, else might be ignored or handled by loose schema)
                    // If your schema is strict and doesn't have transactionId, it will be ignored here, but we still pass it to emails.
                });
                await newOrder.save();
                console.log("Order saved to MongoDB:", orderId);
            } else {
                console.log("Order already exists in DB, skipping save:", orderId);
            }
        } catch (dbError) {
            console.error("Database Save Failed:", dbError);
            // We continue to send emails even if DB fails, or we could strict fail. 
            // For now, logging error is safest to ensure notifications likely go out.
        }

        // 1. Construct Email Content (Customer) - Using Template
        const emailHtml = generateOrderEmail(orderId, customer, items, amount, paymentMethod, transactionId);

        // 1.5 Construct Admin Notification Email
        const adminEmailHtml = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; border-left: 5px solid #155E42;">
                <h2>🔔 New Order Received</h2>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Customer:</strong> ${customer.name} (${customer.email})</p>
                <p><strong>Phone:</strong> ${customer.phone}</p>
                <p><strong>Amount:</strong> ₹${amount}</p>
                <p><strong>Method:</strong> ${paymentMethod}</p>
                ${transactionId ? `<p><strong>Transaction ID:</strong> ${transactionId}</p>` : ''}
                
                <h3>Items:</h3>
                <ul>
                    ${items.map((item: any) => `<li>${item.quantity} x ${item.name}</li>`).join('')}
                </ul>

                <br />
                <a href="${process.env.NEXTAUTH_URL}/admin/orders" style="background-color: #155E42; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View in Admin Panel</a>
            </div>
        `;

        // 2. Send Emails (Parallel)
        await Promise.all([
            // Customer Email
            sendEmail(
                customer.email,
                `Order Confirmation - ${orderId}`,
                emailHtml
            ),
            // Admin Email
            sendEmail(
                "vaishnaviorganics1995@gmail.com", // Admin Email
                `New Order: ${orderId} from ${customer.name}`,
                adminEmailHtml
            )
        ]);

        console.log("Emails sent successfully to Customer and Admin");

        // 3. Send WhatsApp (Free Server Automation)
        if (customer.phone) {
            try {
                const message = `🌿 *Order Confirmed!* \n\nHi ${customer.name}, thanks for shopping with Vaishnavi Organics! \n\n🆔 Order: *${orderId}*\n💰 Amount: *₹${amount}*\n📦 Status: Processing\n\nWe will update you when it ships!`;

                console.log(`📱 Attempting to send WhatsApp to: ${customer.phone}`);

                // Call local WhatsApp Server
                // Note: user must run 'node scripts/whatsapp-server.js' for this to work
                const whatsappResponse = await fetch('http://localhost:3001/send-message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        phone: customer.phone,
                        message: message
                    })
                });

                const whatsappData = await whatsappResponse.json();

                if (whatsappData.success) {
                    console.log("✅ WhatsApp message sent successfully:", whatsappData);
                } else {
                    console.error("❌ WhatsApp Server returned error:", whatsappData);
                }

            } catch (waError: any) {
                console.error("❌ WhatsApp Integration Failed:", waError.message);
                console.error("   Make sure 'node scripts/whatsapp-server.js' is running on port 3001");
                console.error("   And WhatsApp Web is authenticated (scan QR code)");
            }
        } else {
            console.log("⚠️  Skipping WhatsApp: Missing Phone Number");
        }

        return NextResponse.json({ success: true, message: "Order processed and notifications sent" });

    } catch (error: any) {
        console.error("API Error detailed:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to process notifications",
            details: error.message
        }, { status: 500 });
    }
}
