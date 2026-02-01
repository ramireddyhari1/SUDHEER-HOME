
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
    transactionId: String,
    status: { type: String, default: 'Processing' }, // Processing, In Transit, Delivered, Cancelled
    trackingNumber: String,
    courierName: String,
    date: { type: Date, default: Date.now }
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;
