import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PayoutRequest from '@/models/PayoutRequest';
import Partner from '@/models/Partner';

// GET all payout requests (Admin only)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        // In a real app, verify admin session here
        // Assuming admin access for /api/admin/* routes

        const requests = await PayoutRequest.find({})
            .populate('partnerId', 'name email partnerCode')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: requests });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT update request status
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, status, adminNotes } = body;

        if (!id || !status) {
            return NextResponse.json({ success: false, error: 'Missing ID or status' }, { status: 400 });
        }

        const updateData: any = { status, adminNotes };
        if (status === 'Paid') {
            updateData.paidAt = new Date();
        }

        const payoutRequest = await PayoutRequest.findByIdAndUpdate(id, { $set: updateData }, { new: true });

        if (!payoutRequest) {
            return NextResponse.json({ success: false, error: 'Request not found' }, { status: 404 });
        }

        // If marked as Paid, we might want to deduct from Partner's totalCommission
        // OR we can keep totalCommission as "Lifetime Earned" and just track payouts separately.
        // Let's keep it as "Lifetime Earned" for now to avoid complex accounting in this step.

        return NextResponse.json({ success: true, data: payoutRequest });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
