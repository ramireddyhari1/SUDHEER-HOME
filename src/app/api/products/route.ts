
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();
        // Fetch all products, sorted by newest first
        const products = await Product.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, products });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.price || !body.image) {
            return NextResponse.json({ success: false, message: 'Name, Price and Image are required' }, { status: 400 });
        }

        const product = await Product.create(body);
        return NextResponse.json({ success: true, product }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to create product' }, { status: 500 });
    }
}
