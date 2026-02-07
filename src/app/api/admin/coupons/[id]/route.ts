import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

// PUT: Update a coupon (e.g., toggle active status)
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // Use Promise based params as per Next.js 15 warning fixes
) {
    try {
        await connectDB();
        const { id } = await params; // Await params
        const body = await req.json();

        const coupon = await Coupon.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!coupon) {
            return NextResponse.json(
                { success: false, error: 'Coupon not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, coupon });
    } catch (error) {
        console.error('Error updating coupon:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update coupon' },
            { status: 500 }
        );
    }
}

// DELETE: Delete a coupon
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const coupon = await Coupon.findByIdAndDelete(id);

        if (!coupon) {
            return NextResponse.json(
                { success: false, error: 'Coupon not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Coupon deleted' });
    } catch (error) {
        console.error('Error deleting coupon:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete coupon' },
            { status: 500 }
        );
    }
}
