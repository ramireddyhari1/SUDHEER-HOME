import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoupon extends Document {
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minOrderValue?: number;
    expirationDate?: Date;
    usageLimit?: number;
    usedCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CouponSchema: Schema<ICoupon> = new Schema(
    {
        code: {
            type: String,
            required: [true, 'Please provide a coupon code'],
            unique: true,
            trim: true,
            uppercase: true,
        },
        discountType: {
            type: String,
            enum: ['percentage', 'fixed'],
            required: [true, 'Please specify discount type'],
        },
        discountValue: {
            type: Number,
            required: [true, 'Please specify discount value'],
            min: 0,
        },
        minOrderValue: {
            type: Number,
            default: 0,
        },
        expirationDate: {
            type: Date,
        },
        usageLimit: {
            type: Number,
            default: null,
        },
        usedCount: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Coupon: Model<ICoupon> =
    mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);

export default Coupon;
