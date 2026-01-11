export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

// In-memory OTP store (Global variable for development server persistence)
// Note: In production serverless (Vercel), this usually requires a database (Redis/DB)
// as lambdas can't share memory state reliably.
// Key: email, Value: { code, expiry }
const otpStore = new Map<string, { code: string, expiry: number }>();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, type, code: userCode } = body;

        // SCENARIO 1: REQUEST OTP
        if (type === 'request') {
            if (!email) return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });

            // Generate 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiry = Date.now() + 5 * 60 * 1000; // 5 mins

            // Store in memory
            otpStore.set(email, { code: otp, expiry });

            // Send Email
            const emailHtml = `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; padding: 40px; text-align: center; background-color: #FDFBF7;">
                    <div style="max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <h1 style="color: #155E42; margin-bottom: 10px;">Login Verification</h1>
                        <p style="font-size: 16px; color: #666;">Use the code below to sign in to your account.</p>
                        
                        <div style="margin: 30px 0;">
                            <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #155E42; background: #E8F5E9; padding: 15px 30px; border-radius: 8px;">${otp}</span>
                        </div>
                        
                        <p style="font-size: 14px; color: #999;">This code expires in 5 minutes.</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                        <p style="font-size: 12px; color: #aaa;">If you didn't request this, please ignore this email.</p>
                    </div>
                </div>
            `;

            const result = await sendEmail(email, "Your Vaishnavi Organics Login Code", emailHtml);

            if (!result.success) {
                return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
            }

            return NextResponse.json({ success: true, message: "OTP sent successfully" });
        }

        // SCENARIO 2: VERIFY OTP
        if (type === 'verify') {
            if (!email || !userCode) return NextResponse.json({ success: false, message: "Email and code required" }, { status: 400 });

            const record = otpStore.get(email);

            if (!record) {
                return NextResponse.json({ success: false, message: "OTP not found or expired. Please request a new one." }, { status: 400 });
            }

            if (Date.now() > record.expiry) {
                otpStore.delete(email);
                return NextResponse.json({ success: false, message: "OTP has expired." }, { status: 400 });
            }

            if (record.code !== userCode) {
                return NextResponse.json({ success: false, message: "Invalid OTP code." }, { status: 400 });
            }

            // Success
            otpStore.delete(email); // Invalidate used OTP

            // Return mock user tokens or session data here in a real app
            return NextResponse.json({
                success: true,
                user: {
                    name: email.split('@')[0], // Derive check name from email if no DB
                    email: email,
                    image: null
                }
            });
        }

        return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });

    } catch (error: any) {
        console.error("OTP API Error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
