
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper to get uploads directory
const getUploadsDir = () => path.join(process.cwd(), 'public/uploads');

export async function GET() {
    try {
        const uploadDir = getUploadsDir();

        if (!fs.existsSync(uploadDir)) {
            // If folder doesn't exist, return empty list
            return NextResponse.json({ success: true, files: [] });
        }

        const files = fs.readdirSync(uploadDir);

        // Filter for image files only (basic check) and map to URLs
        const imageFiles = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
            .map(file => ({
                name: file,
                url: `/uploads/${file}`,
                path: `/uploads/${file}`, // backward compat
                createdAt: fs.statSync(path.join(uploadDir, file)).birthtime
            }))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Newest first

        return NextResponse.json({ success: true, files: imageFiles });

    } catch (error) {
        console.error("Error fetching media files:", error);
        return NextResponse.json({ success: false, message: 'Failed to fetch files' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const filename = searchParams.get('filename');

        if (!filename) {
            return NextResponse.json({ success: false, message: 'Filename required' }, { status: 400 });
        }

        // Security check: prevent directory traversal
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return NextResponse.json({ success: false, message: 'Invalid filename' }, { status: 400 });
        }

        const filePath = path.join(getUploadsDir(), filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return NextResponse.json({ success: true, message: 'File deleted' });
        } else {
            return NextResponse.json({ success: false, message: 'File not found' }, { status: 404 });
        }

    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({ success: false, message: 'Failed to delete file' }, { status: 500 });
    }
}
