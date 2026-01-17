export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const collection = searchParams.get('collection');
        const id = searchParams.get('id');

        if (id) {
            const product = await Product.findById(id);
            if (!product) {
                return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, product });
        }

        // Build Query
        const query: any = {};

        // Filter by Status (Active only by default unless admin asks)
        // For simplicity API returns all, or we could filter active.
        // query.status = 'active'; 

        if (collection === 'season-best') query.$or = [{ isSeasonBest: true }, { isBestSeller: true }];
        if (collection === 'featured') query.isFeatured = true;
        if (collection === 'organic') query.isOrganicCollection = true;
        if (collection === 'new-arrivals') query.isNewArrival = true;
        if (collection === 'top-rated') query.isTopRated = true;

        // Sorting
        let sort: any = { createdAt: -1 };
        if (collection === 'top-rated') sort = { rating: -1 };

        const products = await Product.find(query).sort(sort);
        return NextResponse.json({ success: true, products });
    } catch (error) {
        console.error("API /products Error:", error);
        return NextResponse.json({ success: false, message: 'Failed to fetch products', error: String(error) }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { _id, ...updateData } = body;

        console.log("PUT Request Body:", body);
        console.log("Updating Product ID:", _id);
        console.log("Update Data:", updateData);

        if (!_id) {
            return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
        }

        const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });

        if (!product) {
            console.log("Product not found for update");
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        console.log("Product updated successfully:", product);
        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ success: false, message: 'Failed to update product' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // Basic validation
        if (!body.name || body.price === undefined || body.price === null || !body.image) {
            return NextResponse.json({
                success: false,
                message: 'Name, Price and Image are required. Price must be a number.'
            }, { status: 400 });
        }

        const product = await Product.create(body);
        console.log("Product Created:", product._id);
        return NextResponse.json({ success: true, product }, { status: 201 });
    } catch (error: any) {
        console.error("Create Product Error:", error);
        return NextResponse.json({
            success: false,
            message: 'Failed to create product',
            error: error.message || String(error)
        }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ success: false, message: 'Failed to delete product' }, { status: 500 });
    }
}
