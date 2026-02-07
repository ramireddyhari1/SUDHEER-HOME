import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/Partner';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find partner with password field
        const partner = await Partner.findOne({ email: email.toLowerCase() }).select('+password');

        if (!partner) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check if partner has access
        if (!partner.hasAccess) {
            return NextResponse.json(
                { success: false, error: 'Account access not enabled. Contact admin.' },
                { status: 403 }
            );
        }

        // Check if partner is active
        if (!partner.isActive) {
            return NextResponse.json(
                { success: false, error: 'Account is inactive. Contact admin.' },
                { status: 403 }
            );
        }

        // Check password
        if (!partner.password) {
            return NextResponse.json(
                { success: false, error: 'Password not set. Contact admin.' },
                { status: 403 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, partner.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Update login tracking
        await Partner.findByIdAndUpdate(partner._id, {
            $inc: { loginCount: 1 },
            $set: { lastLoginAt: new Date() },
        });

        // Generate JWT token
        const token = jwt.sign(
            {
                partnerId: partner._id,
                email: partner.email,
                partnerCode: partner.partnerCode,
                name: partner.name,
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return success with token and partner info
        return NextResponse.json({
            success: true,
            token,
            partner: {
                id: partner._id,
                name: partner.name,
                email: partner.email,
                partnerCode: partner.partnerCode,
                commissionType: partner.commissionType,
                commissionValue: partner.commissionValue,
            },
        });
    } catch (error: any) {
        console.error('Partner login error:', error);
        return NextResponse.json(
            { success: false, error: 'Login failed' },
            { status: 500 }
        );
    }
}
