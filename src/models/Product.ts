
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
    discount: { type: Number, default: 0 }, // Percentage or fixed amount
    rating: { type: Number, default: 5 },
    reviews: { type: Number, default: 0 },

    // Collection Flags
    isSeasonBest: { type: Boolean, default: false }, // "Season's Best Seller"
    isFeatured: { type: Boolean, default: false },   // "Featured Products"
    isNewArrival: { type: Boolean, default: false }, // "New Arrivals"
    isOrganicCollection: { type: Boolean, default: false }, // "Our Organic Collections"
    isTopRated: { type: Boolean, default: false },   // "Top Rated Products"

    // Status
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },

    // Legacy support (optional, can map to isSeasonBest)
    isBestSeller: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now },
});

// Force model recompilation in dev to pick up schema changes
if (process.env.NODE_ENV === 'development') {
    if (models.Product) {
        delete models.Product;
    }
}

const Product = models.Product || model('Product', ProductSchema);

export default Product;
