
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        // 1. Check against Environment Variables first (Hardcoded Admin)
        const envAdminUser = process.env.ADMIN_USERNAME;
        const envAdminPass = process.env.ADMIN_PASSWORD;

        if (username === envAdminUser && password === envAdminPass) {
            // Success - Return a mock admin token/user
            // In a real app, use JWT or Session
            return NextResponse.json({
                success: true,
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
