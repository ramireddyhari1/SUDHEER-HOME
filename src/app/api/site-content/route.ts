import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteContent from '@/models/SiteContent';

// GET /api/site-content?sectionId=shipping-rates
export async function GET(req: Request) {
    try {
        await dbConnect();
        const url = new URL(req.url);
        const sectionId = url.searchParams.get('sectionId');

        if (!sectionId) {
            return NextResponse.json({ success: false, message: 'sectionId is required' }, { status: 400 });
        }

        const data = await SiteContent.findOne({ sectionId });

        return NextResponse.json({ success: true, data: data ? data.content : null });
    } catch (error) {
        console.error("Failed to fetch site content:", error);
        return NextResponse.json({ success: false, message: 'Failed to fetch content' }, { status: 500 });
    }
}

// POST /api/site-content
// Body: { sectionId: 'shipping-rates', content: { ... } }
export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { sectionId, content } = body;

        if (!sectionId || !content) {
            return NextResponse.json({ success: false, message: 'sectionId and content are required' }, { status: 400 });
        }

        const updated = await SiteContent.findOneAndUpdate(
            { sectionId },
            {
                sectionId,
                content,
                updatedAt: new Date()
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("Failed to update site content:", error);
        return NextResponse.json({ success: false, message: 'Failed to update content' }, { status: 500 });
    }
}
