import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

// GET: Fetch all coupons
export async function GET() {
    try {
        await connectDB();
        const coupons = await Coupon.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ 
            success: true, 
            coupons 
        });
    } catch (error) {
        console.error('Error fetching coupons:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch coupons' },
            { status: 500 }
        );
    }
}

// POST: Create a new coupon
export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const coupon = await Coupon.create(body);

        return NextResponse.json({ 
            success: true, 
            coupon 
        }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating coupon:', error);
        
        // Handle duplicate code error
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'Coupon code already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create coupon' },
            { status: 500 }
        );
    }
}
