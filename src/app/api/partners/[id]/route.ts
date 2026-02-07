import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/Partner';

// GET single partner
export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await dbConnect();

        const partner = await Partner.findById(params.id);

        if (!partner) {
            return NextResponse.json(
                { success: false, error: 'Partner not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: partner });
    } catch (error: any) {
        console.error('Error fetching partner:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// PUT update partner
export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await dbConnect();

        const body = await request.json();

        // Don't allow direct modification of analytics fields
        delete body.totalOrders;
        delete body.totalSales;
        delete body.totalCommission;

        const partner = await Partner.findByIdAndUpdate(
            params.id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!partner) {
            return NextResponse.json(
                { success: false, error: 'Partner not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: partner });
    } catch (error: any) {
        console.error('Error updating partner:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// DELETE partner
export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await dbConnect();

        const partner = await Partner.findByIdAndDelete(params.id);

        if (!partner) {
            return NextResponse.json(
                { success: false, error: 'Partner not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Partner deleted successfully' }
        );
    } catch (error: any) {
        console.error('Error deleting partner:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
