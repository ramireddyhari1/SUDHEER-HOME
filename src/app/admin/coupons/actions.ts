'use server';

import Coupon from "@/models/Coupon";
import { sendEmail } from "@/lib/email";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import dbConnect from "@/lib/mongodb";

interface CreateCouponData {
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    email?: string;
    phone?: string;
    minOrderValue?: number;
    expirationDate?: string;
}

export async function createAndSendCoupon(data: CreateCouponData) {
    try {
        await dbConnect();

        // Determine sentTo string
        const sentTo = [];
        if (data.phone) sentTo.push(`WhatsApp: ${data.phone}`);
        if (data.email) sentTo.push(`Email: ${data.email}`);

        // 1. Create Coupon in DB
        const newCoupon = await Coupon.create({
            code: data.code,
            discountType: data.discountType,
            discountValue: data.discountValue,
            minOrderValue: data.minOrderValue || 0,
            expirationDate: data.expirationDate ? new Date(data.expirationDate) : undefined,
            sentTo: sentTo.join(', ') || 'Manual Generation'
        });

        const results = {
            coupon: newCoupon.code,
            emailSent: false,
            whatsappSent: false,
            errors: [] as string[]
        };

        const messageBody = `🎉 Here is your special coupon code: *${newCoupon.code}*\n\n` +
            `Get ${newCoupon.discountType === 'percentage' ? newCoupon.discountValue + '%' : '₹' + newCoupon.discountValue} OFF` +
            `${newCoupon.minOrderValue ? ` on orders above ₹${newCoupon.minOrderValue}` : ''}!` +
            `\n\nValid until: ${newCoupon.expirationDate ? newCoupon.expirationDate.toLocaleDateString() : 'Forever'}` +
            `\n\nShop now at Vaishnavi Organics!`;

        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%; background-color: #f4f4f5;">
        <tr>
            <td align="center" style="padding: 40px 10px;">
                <!-- Card Container -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    
                    <!-- Header / Banner -->
                    <tr>
                        <td style="background-color: #155E42; padding: 30px; text-align: center; background-image: url('https://vaishnaviorganics.store/pattern-bg.png'); background-blend-mode: soft-light;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 1px; font-family: 'Georgia', serif;">Vaishnavi Organics</h1>
                            <p style="color: #e2e8f0; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Authentic & Traditional</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px; text-align: center;">
                            <p style="color: #64748b; font-size: 16px; margin: 0 0 20px 0;">Hello,</p>
                            <h2 style="color: #1e293b; font-size: 24px; margin: 0 0 10px 0; font-weight: 700;">A Special Gift For You 🎁</h2>
                            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                We're delighted to offer you a special discount on your next purchase of our organic sweets and pickles.
                            </p>

                            <!-- Coupon Box -->
                            <div style="background-color: #f0fdf4; border: 2px dashed #155E42; border-radius: 8px; padding: 25px; margin: 0 auto 30px auto; max-width: 400px; position: relative;">
                                <p style="color: #155E42; font-size: 12px; text-transform: uppercase; margin: 0 0 5px 0; font-weight: 600; letter-spacing: 1px;">Use Code At Checkout</p>
                                <div style="color: #155E42; font-size: 32px; font-family: monospace; font-weight: 700; letter-spacing: 2px; margin: 10px 0;">${newCoupon.code}</div>
                                <div style="display: inline-block; background-color: #155E42; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;">
                                    ${newCoupon.discountType === 'percentage' ? newCoupon.discountValue + '%' : '₹' + newCoupon.discountValue} OFF
                                </div>
                            </div>

                            <!-- Details -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 400px; margin: 0 auto; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                                <tr>
                                    <td style="padding: 5px 0; color: #64748b; font-size: 14px;">Minimum Order:</td>
                                    <td align="right" style="padding: 5px 0; color: #1e293b; font-size: 14px; font-weight: 600;">
                                        ${newCoupon.minOrderValue ? '₹' + newCoupon.minOrderValue : 'None'}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #64748b; font-size: 14px;">Valid Until:</td>
                                    <td align="right" style="padding: 5px 0; color: #1e293b; font-size: 14px; font-weight: 600;">
                                        ${newCoupon.expirationDate ? newCoupon.expirationDate.toLocaleDateString() : 'No Expiry'}
                                    </td>
                                </tr>
                            </table>

                            <!-- Button -->
                            <div style="margin-top: 35px;">
                                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #155E42; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(21, 94, 66, 0.2);">Shop Now</a>
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="color: #94a3b8; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Vaishnavi Organics. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        // 2. Send via WhatsApp
        if (data.phone) {
            try {
                let phone = data.phone.replace(/\D/g, '');
                if (phone.length === 10) phone = '91' + phone;

                const wpRes = await sendWhatsAppMessage(phone + '@c.us', messageBody);
                if (wpRes.status === 'success' || wpRes.id) {
                    results.whatsappSent = true;
                } else {
                    results.whatsappSent = true;
                }
            } catch (err: any) {
                console.error("WhatsApp Send Error:", err);
                results.errors.push(`WhatsApp Error: ${err.message}`);
            }
        }

        // 3. Send via Email
        if (data.email) {
            try {
                const emailRes = await sendEmail(data.email, "Your Special Coupon Code! 🎁", htmlBody);
                if (emailRes.success) {
                    results.emailSent = true;
                } else {
                    results.errors.push(`Email Error: ${JSON.stringify(emailRes.error)}`);
                }
            } catch (err: any) {
                console.error("Email Send Error:", err);
                results.errors.push(`Email Error: ${err.message}`);
            }
        }

        return { success: true, ...results };

    } catch (error: any) {
        console.error("Create Coupon Error:", error);
        if (error.code === 11000) {
            return { success: false, error: "Coupon code already exists. Please choose a different code." };
        }
        return { success: false, error: error.message || "Unknown Server Error" };
    }
}

export async function getCoupons() {
    try {
        await dbConnect();
        // Return latest 20 coupons
        const coupons = await Coupon.find().sort({ createdAt: -1 }).limit(20).lean();

        // Convert dates and special types for serialization
        return coupons.map((coupon: any) => ({
            ...coupon,
            _id: coupon._id.toString(),
            expirationDate: coupon.expirationDate ? coupon.expirationDate.toISOString() : null,
            createdAt: coupon.createdAt ? coupon.createdAt.toISOString() : null,
            updatedAt: coupon.updatedAt ? coupon.updatedAt.toISOString() : null,
        }));
    } catch (error) {
        console.error("Failed to fetch coupons:", error);
        return [];
    }
}
