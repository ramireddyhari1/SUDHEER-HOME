import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/Partner';
import bcrypt from 'bcryptjs';

export async function POST(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await dbConnect();

        const { password, hasAccess } = await request.json();

        if (!password || password.length < 6) {
            return NextResponse.json(
                { success: false, error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update partner
        const partner = await Partner.findByIdAndUpdate(
            params.id,
            {
                password: hashedPassword,
                hasAccess: hasAccess !== undefined ? hasAccess : true,
            },
            { new: true }
        );

        if (!partner) {
            return NextResponse.json(
                { success: false, error: 'Partner not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Partner access credentials set successfully',
        });
    } catch (error: any) {
        console.error('Error setting partner password:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to set credentials' },
            { status: 500 }
        );
    }
}
