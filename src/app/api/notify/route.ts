
import { NextResponse } from 'next/server';
import { transporter } from '@/lib/email';
// We reused the transporter export for compatibility with the existing sendMail call below, 
// or we could use the sendEmail helper. For minimal changes to the complex HTML logic below, keeping transporter usage.

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

        // 1. Construct Email Content
        const itemsHtml = items.map((item: any) => `
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${item.price * item.quantity}</td>
            </tr>
        `).join('');

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                <h1 style="color: #155E42; text-align: center;">Order Confirmed! 🌿</h1>
                <p>Hello <strong>${customer.name}</strong>,</p>
                <p>Thank you for shopping with Vaishnavi Organics. Your order has been successfully placed.</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
                    <p style="margin: 5px 0;"><strong>Amount:</strong> ₹${amount}</p>
                    <p style="margin: 5px 0;"><strong>Payment:</strong> ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                </div>

                <h3>Shipping Details</h3>
                <p>${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}</p>
                <p>Phone: ${customer.phone}</p>

                <h3>Order Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #155E42; color: white;">
                            <th style="padding: 8px; text-align: left;">Item</th>
                            <th style="padding: 8px; text-align: left;">Qty</th>
                            <th style="padding: 8px; text-align: left;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>

                <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #777;">
                    If you have any questions, contact us at +91 1234 567 890
                </p>
            </div>
        `;

        // 2. Send Email
        await transporter.sendMail({
            from: '"Vaishnavi Organics" <agentcat31@gmail.com>',
            to: customer.email,
            subject: `Order Confirmation - ${orderId}`,
            html: emailHtml,
        });

        console.log("Email sent successfully to:", customer.email);

        // 3. Send WhatsApp (Twilio)
        // Only run if credentials are present to avoid crashes
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

        return NextResponse.json({ success: true, message: "Notifications processed" });

    } catch (error: any) {
        console.error("API Error detailed:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to process notifications",
            details: error.message
        }, { status: 500 });
    }
}
