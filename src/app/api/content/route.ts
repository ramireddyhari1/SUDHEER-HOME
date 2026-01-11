
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const url = new URL(req.url);
        const section = url.searchParams.get('section');

        const query = section ? { section } : {};
        const content = await Content.find(query);

        // Convert array to object for easier frontend consumption
        // { "home_hero_title": "Value" }
        const contentMap: any = {};
        content.forEach((item) => {
            contentMap[item.key] = item.value;
        });

        return NextResponse.json({ success: true, content: contentMap });
    } catch (error) {
        console.error("Failed to fetch content:", error);
        return NextResponse.json({ success: false, message: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { updates, section } = body; // Expects updates: { key: value, key2: value2 }

        if (!updates || !section) {
            return NextResponse.json({ success: false, message: 'Bad Request' }, { status: 400 });
        }

        const promises = Object.keys(updates).map(async (key) => {
            return Content.findOneAndUpdate(
                { key },
                {
                    key,
                    value: updates[key],
                    section,
                    type: typeof updates[key] === 'string' ? 'text' : 'json'
                },
                { upsert: true, new: true }
            );
        });

        await Promise.all(promises);

        return NextResponse.json({ success: true, message: 'Content updated' });
    } catch (error) {
        console.error("Failed to update content:", error);
        return NextResponse.json({ success: false, message: 'Failed to update content' }, { status: 500 });
    }
}
