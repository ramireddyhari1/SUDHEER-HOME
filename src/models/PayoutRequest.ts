import mongoose, { Schema, Document } from 'mongoose';

export interface IPayoutRequest extends Document {
    partnerId: mongoose.Types.ObjectId;
    amount: number;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Paid';
    payoutMethod: 'UPI' | 'Bank';
    payoutDetails: {
        upiId?: string;
        bankDetails?: {
            accountHolder: string;
            accountNumber: string;
            ifscCode: string;
            bankName: string;
        };
    };
    adminNotes?: string;
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const PayoutRequestSchema: Schema = new Schema({
    partnerId: { type: Schema.Types.ObjectId, ref: 'Partner', required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Paid'],
        default: 'Pending'
    },
    payoutMethod: { type: String, enum: ['UPI', 'Bank'], required: true },
    payoutDetails: {
        upiId: String,
        bankDetails: {
            accountHolder: String,
            accountNumber: String,
            ifscCode: String,
            bankName: String,
        }
    },
    adminNotes: String,
    paidAt: Date,
}, { timestamps: true });

export default mongoose.models.PayoutRequest || mongoose.model<IPayoutRequest>('PayoutRequest', PayoutRequestSchema);
