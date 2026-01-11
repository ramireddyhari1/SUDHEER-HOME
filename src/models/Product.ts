
import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    englishName: { type: String }, // Optional alternative name
    description: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    weight: { type: String, default: "1 kg" },
    image: { type: String, required: true }, // URL to image
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 5 },
    reviews: { type: Number, default: 0 },
    isBestSeller: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
