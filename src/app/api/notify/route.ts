export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { transporter } from '@/lib/email';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { generateOrderEmail } from '@/lib/email-templates';


export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Received Notification Request:", body); // DEBUG LOG

        const { orderId, amount, paymentMethod, customer, items } = body;

        // Verify Transporter connection
        try {
            await transporter.verify();
            console.log("SMTP Connection verified");
        } catch (verifyError) {
            console.error("SMTP Connection Failed:", verifyError);
            return NextResponse.json({ success: false, error: "SMTP Connection Failed", details: verifyError }, { status: 500 });
        }

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
                    status: 'Processing'
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
        const emailHtml = generateOrderEmail(orderId, customer, items, amount, paymentMethod);

        // 1.5 Construct Admin Notification Email
        const adminEmailHtml = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; border-left: 5px solid #155E42;">
                <h2>🔔 New Order Received</h2>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Customer:</strong> ${customer.name} (${customer.email})</p>
                <p><strong>Phone:</strong> ${customer.phone}</p>
                <p><strong>Amount:</strong> ₹${amount}</p>
                <p><strong>Method:</strong> ${paymentMethod}</p>
                
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
            transporter.sendMail({
                from: '"Vaishnavi Organics" <agentcat31@gmail.com>',
                to: customer.email,
                subject: `Order Confirmation - ${orderId}`,
                html: emailHtml,
            }),
            // Admin Email
            transporter.sendMail({
                from: '"Vaishnavi Organics" <agentcat31@gmail.com>',
                to: "vaishnaviorganics1995@gmail.com", // Admin Email
                subject: `New Order: ${orderId} from ${customer.name}`,
                html: adminEmailHtml,
            })
        ]);

        console.log("Emails sent successfully to Customer and Admin");

        // 3. Send WhatsApp (Twilio)
        // ... (WhatsApp logic remains same) ...
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromWhatsapp = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // Default sandbox number

        if (accountSid && authToken && customer.phone) {
            try {
                const twilio = (await import('twilio')).default;
                const client = twilio(accountSid, authToken);

                // Format phone number (ensure it has +91 or country code)
                // Basic cleanup: remove spaces/dashes. If starts with 9, assume/prepend +91
                let cleanPhone = customer.phone.replace(/\D/g, '');
                if (cleanPhone.length === 10) cleanPhone = '+91' + cleanPhone;
                // If it already has country code, Twilio expects E.164 format. 
                // We'll trust the user or our cleanup for this demo.
                if (!cleanPhone.startsWith('+')) cleanPhone = '+' + cleanPhone;

                const message = `🌿 *Order Confirmed!* \n\nHi ${customer.name}, thanks for shopping with Vaishnavi Organics! \n\n🆔 Order: *${orderId}*\n💰 Amount: *₹${amount}*\n📦 Status: Processing\n\nWe will update you when it ships!`;

                await client.messages.create({
                    body: message,
                    from: fromWhatsapp,
                    to: `whatsapp:${cleanPhone}`
                });
                console.log("WhatsApp sent to:", cleanPhone);
            } catch (waError) {
                console.error("WhatsApp Failed:", waError);
                // Don't fail the whole request if WA fails, just log it
            }
        } else {
            console.log("Skipping WhatsApp: Missing Credentials or Phone Number");
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
