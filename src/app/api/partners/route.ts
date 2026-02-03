import { NextRequest, NextResponse } from 'next/server';
import Partner from '@/models/Partner';
import dbConnect from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper to check admin auth
const checkAdminAuth = (request: NextRequest) => {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

    const token = authHeader.split(' ')[1];
    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        return decoded.isAdmin === true;
    } catch (error) {
        return false;
    }
};

// Helper for email validation
const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// GET all partners
export async function GET(request: NextRequest) {
    try {
        // Enforce authentication
        if (!checkAdminAuth(request)) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const { searchParams } = new URL(request.url);
        const activeOnly = searchParams.get('active') === 'true';

        const query = activeOnly ? { isActive: true } : {};
        // Use explicit projection to exclude sensitive fields
        const partners = await Partner.find(query).select('-password -__v').sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: partners });
    } catch (error: any) {
        console.error('Error fetching partners:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST create new partner
export async function POST(request: NextRequest) {
    try {
        // Enforce admin-only access
        if (!checkAdminAuth(request)) {
            return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 });
        }

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

        // Email format validation
        if (!validateEmail(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Commission validation
        const allowedCommissionTypes = ['percentage', 'fixed'];
        if (!allowedCommissionTypes.includes(commissionType)) {
            return NextResponse.json(
                { success: false, error: 'Invalid commission type' },
                { status: 400 }
            );
        }

        if (commissionType === 'percentage' && (commissionValue < 0 || commissionValue > 100)) {
            return NextResponse.json(
                { success: false, error: 'Percentage commission must be between 0 and 100' },
                { status: 400 }
            );
        }

        if (commissionType === 'fixed' && commissionValue < 0) {
            return NextResponse.json(
                { success: false, error: 'Fixed commission must be at least 0' },
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

        // Convert to plain object and remove sensitive fields before returning
        const partnerResponse = partner.toObject();
        delete partnerResponse.password;
        delete partnerResponse.__v;

        return NextResponse.json(
            { success: true, data: partnerResponse },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating partner:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
