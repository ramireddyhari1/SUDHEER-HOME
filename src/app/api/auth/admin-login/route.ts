export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        // 1. Check against Environment Variables first (Hardcoded Admin)
        const envAdminUser = process.env.ADMIN_USERNAME;
        const envAdminPass = process.env.ADMIN_PASSWORD;

        if (username === envAdminUser && password === envAdminPass) {
            // Success - Generate a JWT
            const token = jwt.sign(
                { name: 'Super Admin', email: 'admin@sweet.com', isAdmin: true },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            // Create response
            const response = NextResponse.json({
                success: true,
                token,
                user: { name: 'Super Admin', email: 'admin@sweet.com', isAdmin: true }
            });

            // Set HTTP-only cookie
            response.cookies.set('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/'
            });

            return response;
        }

        // 2. (Optional) Check Database for other admin users
        await dbConnect();
        // const user = await User.findOne({ email: username }).select('+password');
        // if (!user || !user.isAdmin || user.password !== password) {
        //      // Logic to set cookie would go here too
        // }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });

    } catch (error) {
        console.error('Admin Login Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
