
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
}

const ContentSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    type: { type: String, default: 'text' },
    section: { type: String, required: true },
});

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

const heroSlides = [
    {
        id: 1,
        image: "/POSTERS/site.jpg",
        title: "Pure. Organic. Traditional.",
        description: "Experience the goodness of nature with our handpicked collection of organic sweets.",
        cta: "Shop Now",
        link: "/products",
        hideText: false
    },
    {
        id: 2,
        image: "/story/village.png",
        title: "From Our Village to Your Home",
        description: "Authentic flavors sourced directly from farmers who care.",
        cta: "Our Story",
        link: "/about",
        hideText: false
    },
    {
        id: 3,
        image: "/POSTERS/10-percent-off-first-order.png",
        title: "Welcome Offer",
        description: "Get Flat 10% OFF on your first order with code WELCOME10",
        cta: "Claim Offer",
        link: "/signup",
        hideText: true // Text might overlay poorly on this poster
    }
];

async function seedSlides() {
    try {
        console.log("🌱 Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected");

        console.log("Updating hero_slides...");
        await Content.findOneAndUpdate(
            { key: "hero_slides" },
            {
                key: "hero_slides",
                value: heroSlides,
                type: "json",
                section: "home-hero"
            },
            { upsert: true, new: true }
        );

        console.log("✅ Hero slides successfully seeded!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

seedSlides();
