
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
}

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    englishName: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    weight: { type: String, default: "1 kg" },
    image: { type: String, required: true },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 5 },
    reviews: { type: Number, default: 0 },
    isBestSeller: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const sampleProducts = [
    // Best Sellers
    {
        name: "Palm Jaggery Cubes",
        englishName: "(Karupatti)",
        description: "Natural organic palm jaggery cubes, rich in iron and bone health benefits.",
        price: 260,
        originalPrice: 320,
        weight: "500 g",
        image: "/products/jaggery cubes.png",
        category: "Sweeteners",
        stock: 50,
        tags: ["Natural Sweetener", "Iron Rich", "Bone Health"],
        rating: 4.9,
        reviews: 420,
        isBestSeller: true
    },
    {
        name: "Black Rice",
        englishName: "(Kavuni Arisi)",
        description: "Ancient superfood rice loaded with antioxidants and great for diabetes management.",
        price: 350,
        originalPrice: 450,
        weight: "1 kg",
        image: "/products/black rice.png",
        category: "Rice",
        stock: 30,
        tags: ["Antioxidants", "Superfood", "Diabetes Friendly"],
        rating: 4.8,
        reviews: 185,
        isBestSeller: true
    },
    {
        name: "Palm Jaggery Powder",
        englishName: "(Nattu Sakkarai)",
        description: "Pure chemical-free palm jaggery powder, perfect for coffee and tea.",
        price: 280,
        originalPrice: 340,
        weight: "500 g",
        image: "/products/jaggery powder.png",
        category: "Sweeteners",
        stock: 45,
        tags: ["Chemical Free", "Mineral Rich", "Coffee Ready"],
        rating: 4.9,
        reviews: 310,
        isBestSeller: true
    },
    {
        name: "Traditional Brown Rice",
        englishName: "(Kaikuthal Arisi)",
        description: "Farm fresh hand-pounded brown rice, high in fiber and aids weight loss.",
        price: 180,
        originalPrice: 240,
        weight: "1 kg",
        image: "/products/brown rice.png",
        category: "Rice",
        stock: 60,
        tags: ["High Fiber", "Weight Loss", "Farm Fresh"],
        rating: 4.7,
        reviews: 150,
        isBestSeller: true
    },

    // New Arrivals / Fresh from Farm
    {
        name: "Lakadong Turmeric",
        englishName: "High Curcumin Turmeric",
        description: "World's finest turmeric powder with high curcumin content.",
        price: 399,
        originalPrice: 499,
        weight: "250g",
        image: "/products/turmeric_powder.png",
        category: "Spices",
        stock: 40,
        tags: ["Spices", "Immunity", "Organic"],
        isBestSeller: false
    },
    {
        name: "A2 Gir Cow Ghee",
        englishName: "Bilona Method Ghee",
        description: "Pure A2 ghee made from indigenous Gir cows using traditional Bilona method.",
        price: 1250,
        originalPrice: 1450,
        weight: "500ml",
        image: "/products/ghee.png",
        category: "Dairy",
        stock: 20,
        tags: ["Dairy", "Healthy Fat", "A2"],
        isBestSeller: true
    },
    {
        name: "Wild Forest Honey",
        englishName: "Raw Honey",
        description: "Unprocessed nectar from wild forest flowers.",
        price: 650,
        originalPrice: 700,
        weight: "500g",
        image: "/products/raw_honey.png",
        category: "Sweeteners",
        stock: 35,
        tags: ["Honey", "Raw", "Superfood"],
        isBestSeller: false
    }
];

async function seed() {
    try {
        console.log("🌱 Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected");

        console.log("🧹 Clearing existing products...");
        await Product.deleteMany({}); // Optional: clear old data to avoid duplicates

        console.log("📦 Inserting sample products...");
        await Product.insertMany(sampleProducts);

        console.log("✅ Database successfully seeded!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

seed();
