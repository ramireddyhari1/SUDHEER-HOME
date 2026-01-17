
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing from env");
    process.exit(1);
}

console.log("Found MONGODB_URI:", MONGODB_URI.substring(0, 20) + "...");

async function testConnection() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI!);
        console.log("✅ Connected to MongoDB successfully!");

        // Test Schema Validation with the exact model
        const ProductSchema = new mongoose.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            stock: { type: Number, default: 0 },
            isSeasonBest: { type: Boolean, default: false }
        });

        // Use a temporary model name to avoid conflicts
        const TestProduct = mongoose.models.TestProduct || mongoose.model('TestProduct', ProductSchema);

        console.log("Attempting to create a test product...");
        const product = await TestProduct.create({
            name: "Test Jaggery",
            price: 100,
            image: "/test.png",
            stock: 10,
            isSeasonBest: true
        });

        console.log("✅ Test Product Created:", product._id);

        await TestProduct.findByIdAndDelete(product._id);
        console.log("✅ Test Product Cleaned up");

    } catch (error: any) {
        console.error("❌ DB Operation Failed:", error.message);
        if (error.errors) {
            console.error("Validation Errors:", JSON.stringify(error.errors, null, 2));
        }
    } finally {
        await mongoose.disconnect();
    }
}

testConnection();
