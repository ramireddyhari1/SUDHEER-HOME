
import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    orderId: { type: String, required: true, unique: true },
    customer: {
        name: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String
    },
    items: [
        {
            id: String,
            name: String,
            price: Number,
            quantity: Number,
            image: String
        }
    ],
    amount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'online' },
    transactionId: { type: String, unique: true, sparse: true }, // Sparse allows multiple nulls for COD orders
    status: { type: String, default: 'Processing' }, // Processing, In Transit, Delivered, Cancelled
    trackingNumber: String,
    courierName: String,

    // Partner/Affiliate tracking
    partnerCode: { type: String, uppercase: true },
    partnerId: { type: Schema.Types.ObjectId, ref: 'Partner' },
    partnerCommission: { type: Number, default: 0 },

    date: { type: Date, default: Date.now }
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;
