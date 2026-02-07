import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPartner extends Document {
    name: string;
    email: string;
    phone?: string;
    partnerCode: string; // Unique code used as coupon
    commissionType: 'percentage' | 'fixed';
    commissionValue: number;
    isActive: boolean;
    logo?: string;
    description?: string;
    website?: string;

    // Payout Details
    payoutDetails?: {
        upiId?: string;
        bankDetails?: {
            accountHolder: string;
            accountNumber: string;
            ifscCode: string;
            bankName: string;
        };
    };

    // Authentication
    password?: string;
    hasAccess: boolean; // Whether partner can login

    // Login Tracking
    loginCount: number;
    lastLoginAt?: Date;

    // Analytics
    totalOrders: number;
    totalSales: number;
    totalCommission: number;

    // Metadata
    createdAt: Date;
    updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
    {
        name: {
            type: String,
            required: [true, 'Partner name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Partner email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        partnerCode: {
            type: String,
            required: [true, 'Partner code is required'],
            unique: true,
            uppercase: true,
            trim: true,
            minlength: [3, 'Partner code must be at least 3 characters'],
            maxlength: [20, 'Partner code must not exceed 20 characters'],
        },
        commissionType: {
            type: String,
            enum: ['percentage', 'fixed'],
            default: 'percentage',
        },
        commissionValue: {
            type: Number,
            required: [true, 'Commission value is required'],
            min: [0, 'Commission value must be positive'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        logo: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },

        // Payout Details
        payoutDetails: {
            upiId: { type: String, trim: true },
            bankDetails: {
                accountHolder: { type: String, trim: true },
                accountNumber: { type: String, trim: true },
                ifscCode: { type: String, trim: true },
                bankName: { type: String, trim: true },
            }
        },

        // Authentication
        password: {
            type: String,
            select: false, // Don't return password by default
        },
        hasAccess: {
            type: Boolean,
            default: true,
        },

        // Login Tracking
        loginCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        lastLoginAt: {
            type: Date,
        },

        // Analytics
        totalOrders: {
            type: Number,
            default: 0,
            min: 0,
        },
        totalSales: {
            type: Number,
            default: 0,
            min: 0,
        },
        totalCommission: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
PartnerSchema.index({ partnerCode: 1 });
PartnerSchema.index({ email: 1 });
PartnerSchema.index({ isActive: 1 });

// Method to calculate commission for an order
PartnerSchema.methods.calculateCommission = function (orderTotal: number): number {
    if (this.commissionType === 'percentage') {
        return (orderTotal * this.commissionValue) / 100;
    }
    return this.commissionValue;
};

const Partner: Model<IPartner> =
    mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);

export default Partner;
