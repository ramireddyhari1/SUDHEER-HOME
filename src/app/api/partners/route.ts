import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/Partner';
import bcrypt from 'bcryptjs';

// GET all partners
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const activeOnly = searchParams.get('active') === 'true';

        const query = activeOnly ? { isActive: true } : {};
        const partners = await Partner.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: partners });
    } catch (error: any) {
        console.error('Error fetching partners:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST create new partner
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const {
            name,
            email,
            phone,
            partnerCode,
            commissionType = 'percentage',
            commissionValue = 10,
            logo,
            description,
            website,
            isActive = true,
            password,
            hasAccess = true,
        } = body;

        // Validate required fields
        if (!name || !email || !partnerCode) {
            return NextResponse.json(
                { success: false, error: 'Name, email, and partner code are required' },
                { status: 400 }
            );
        }

        // Check if partner code already exists
        const existingCode = await Partner.findOne({
            partnerCode: partnerCode.toUpperCase()
        });
        if (existingCode) {
            return NextResponse.json(
                { success: false, error: 'Partner code already exists' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingEmail = await Partner.findOne({ email: email.toLowerCase() });
        if (existingEmail) {
            return NextResponse.json(
                { success: false, error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Hash password if provided
        let hashedPassword = undefined;
        if (password) {
            if (password.length < 6) {
                return NextResponse.json(
                    { success: false, error: 'Password must be at least 6 characters' },
                    { status: 400 }
                );
            }
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Create partner
        const partner = await Partner.create({
            name,
            email,
            phone,
            partnerCode: partnerCode.toUpperCase(),
            commissionType,
            commissionValue,
            logo,
            description,
            website,
            isActive,
            password: hashedPassword,
            hasAccess,
        });

        return NextResponse.json(
            { success: true, data: partner },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating partner:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
