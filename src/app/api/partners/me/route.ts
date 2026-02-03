import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/Partner';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        // Get token from Authorization header
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        let decoded: any;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return NextResponse.json(
                { success: false, error: 'Invalid token' },
                { status: 401 }
            );
        }

        if (!decoded || !decoded.partnerId) {
            return NextResponse.json(
                { success: false, error: 'Invalid token payload' },
                { status: 401 }
            );
        }

        // Find partner
        const partner = await Partner.findById(decoded.partnerId);

        if (!partner) {
            return NextResponse.json(
                { success: false, error: 'Partner not found' },
                { status: 404 }
            );
        }

        // Check if partner is active and has access
        if (!partner.isActive || !partner.hasAccess) {
            return NextResponse.json(
                { success: false, error: 'Partner access disabled' },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                id: partner._id,
                name: partner.name,
                email: partner.email,
                partnerCode: partner.partnerCode,
                commissionType: partner.commissionType,
                commissionValue: partner.commissionValue,
            }
        });

    } catch (error: any) {
        console.error('Error in /api/partners/me:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
