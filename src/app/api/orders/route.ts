export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { transporter } from '@/lib/email';

export async function GET(req: Request) {
    try {
        await dbConnect();
        // Fetch all orders, sorted by newest first
        const orders = await Order.find({}).sort({ date: -1 });

        return NextResponse.json({ success: true, orders });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json({ success: false, message: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { orderId, status, trackingNumber, courierName } = body;

        if (!orderId) {
            return NextResponse.json({ success: false, message: 'OrderId required' }, { status: 400 });
        }

        // Prepare update object
        const updateData: any = {};
        if (status) updateData.status = status;
        if (trackingNumber) updateData.trackingNumber = trackingNumber;
        if (courierName) updateData.courierName = courierName;

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            updateData,
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        // Send Status Update Email
        try {
            const trackingHtml = updatedOrder.trackingNumber ? `
                <div style="margin-top: 20px; text-align: center;">
                    <p style="margin-bottom: 5px;"><strong>Tracking Number:</strong></p>
                    <p style="font-family: monospace; font-size: 18px; background: #eee; display: inline-block; padding: 5px 10px; border-radius: 4px;">${updatedOrder.trackingNumber}</p>
                    ${updatedOrder.courierName ? `<p style="font-size: 12px; color: #666;">Courier: ${updatedOrder.courierName}</p>` : ''}
                </div>
            ` : '';

            const emailHtml = `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                    <h1 style="color: #155E42; text-align: center;">Order Update 🚚</h1>
                    <p>Hello <strong>${updatedOrder.customer?.name || 'Customer'}</strong>,</p>
                    <p>Your order <strong>${orderId}</strong> status has been updated to:</p>
                    
                    <div style="background-color: #f0fdf4; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                        <span style="font-size: 24px; font-weight: bold; color: #155E42; text-transform: uppercase;">
                            ${updatedOrder.status}
                        </span>
                        ${trackingHtml}
                    </div>

                    <p>You can check the status of your order anytime.</p>
                    
                    <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #777;">
                        Thank you for choosing Vaishnavi Organics.<br/>
                        Questions? Reply to this email.
                    </p>
                </div>
            `;

            await transporter.sendMail({
                from: '"Vaishnavi Organics" <agentcat31@gmail.com>',
                to: updatedOrder.customer?.email,
                subject: `Order Update: ${orderId} is ${updatedOrder.status}`,
                html: emailHtml,
            });
            console.log(`Status update email sent to ${updatedOrder.customer?.email}`);
        } catch (emailError) {
            console.error("Failed to send status email:", emailError);
            // Don't fail the request, just log it
        }

        return NextResponse.json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error("Failed to update order:", error);
        return NextResponse.json({ success: false, message: 'Failed to update order' }, { status: 500 });
    }
}
