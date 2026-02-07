import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/Partner';
import PayoutRequest from '@/models/PayoutRequest';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

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

        const body = await request.json();
        const { amount, payoutMethod } = body;

        if (!amount || amount <= 0) {
            return NextResponse.json({ success: false, error: 'Invalid amount' }, { status: 400 });
        }

        // Logic check: Minimum ₹500
        if (amount < 500) {
            return NextResponse.json({ success: false, error: 'Minimum withdrawal is ₹500' }, { status: 400 });
        }

        // Check if partner has enough commission
        if (partner.totalCommission < amount) {
            return NextResponse.json({ success: false, error: 'Insufficient balance' }, { status: 400 });
        }

        // Check if payout details are configured
        if (payoutMethod === 'UPI' && !partner.payoutDetails?.upiId) {
            return NextResponse.json({ success: false, error: 'UPI ID not configured' }, { status: 400 });
        }
        if (payoutMethod === 'Bank' && !partner.payoutDetails?.bankDetails?.accountNumber) {
            return NextResponse.json({ success: false, error: 'Bank details not configured' }, { status: 400 });
        }

        // Create the request
        const payoutRequest = await PayoutRequest.create({
            partnerId: partner._id,
            amount,
            payoutMethod,
            payoutDetails: partner.payoutDetails,
            status: 'Pending'
        });

        // Optional: Deduct from totalCommission immediately or mark as "Pending Payout"
        // For now, we just create the record. Admin will mark as legacy.

        return NextResponse.json({
            success: true,
            message: 'Payout request submitted successfully',
            data: payoutRequest
        });

    } catch (error: any) {
        console.error('Payout Request Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// GET partner's own requests
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const decoded: any = jwt.verify(token, JWT_SECRET);

        const requests = await PayoutRequest.find({ partnerId: decoded.partnerId }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: requests });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
