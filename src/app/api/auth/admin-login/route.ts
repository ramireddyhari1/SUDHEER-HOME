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

            return NextResponse.json({
                success: true,
                token,
                user: { name: 'Super Admin', email: 'admin@sweet.com', isAdmin: true }
            });
        }

        // 2. (Optional) Check Database for other admin users
        await dbConnect();
        // const user = await User.findOne({ email: username }).select('+password');
        // if (!user || !user.isAdmin || user.password !== password) { // Plaintext check for demo only
        //     return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        // }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });

    } catch (error) {
        console.error('Admin Login Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
