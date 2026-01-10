
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using standard SMTP (Placeholders for USER to fill)
// Ideally, use environment variables: process.env.SMTP_USER, process.env.SMTP_PASS
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to 'hotmail', 'yahoo', etc.
    auth: {
        user: 'agentcat31@gmail.com', // REPLACE WITH YOUR EMAIL
        pass: 'Hariharan123@'     // REPLACE WITH YOUR APP PASSWORD
    }
});

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
            from: '"Vaishnavi Organics" <agentcat31@gmail.com>', // Sender address
            to: customer.email, // Use customer email from request
            subject: `Order Confirmation - ${orderId}`,
            html: emailHtml,
        });

        console.log("Email sent successfully to:", customer.email);

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
