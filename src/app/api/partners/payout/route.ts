import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/Partner';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// GET payout details for current partner
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        // Get token from Authorization header
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const decoded: any = jwt.verify(token, JWT_SECRET);

        const partner = await Partner.findById(decoded.partnerId);
        if (!partner) {
            return NextResponse.json({ success: false, error: 'Partner not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: partner.payoutDetails || { upiId: '', bankDetails: null }
        });
    } catch (error: any) {
        console.error('Error fetching payout details:', error);
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
}

// PUT (update) payout details for current partner
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();

        // Get token from Authorization header
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const decoded: any = jwt.verify(token, JWT_SECRET);

        const body = await request.json();
        const { payoutDetails } = body;

        const partner = await Partner.findByIdAndUpdate(
            decoded.partnerId,
            { $set: { payoutDetails } },
            { new: true, runValidators: true }
        );

        if (!partner) {
            return NextResponse.json({ success: false, error: 'Partner not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Payout details updated successfully',
            data: partner.payoutDetails
        });
    } catch (error: any) {
        console.error('Error updating payout details:', error);
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
}
