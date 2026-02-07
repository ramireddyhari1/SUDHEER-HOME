
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

const sampleContent = [
    // Home Hero Section
    { key: "hero_title", value: "Pure. Organic. Traditional.", section: "home-hero", type: "text" },
    { key: "hero_subtitle", value: "Experience the goodness of nature with our handpicked collection of organic sweets, staples, and farm-fresh produce.", section: "home-hero", type: "text" },
    { key: "hero_btn_text", value: "Shop Nature's Best", section: "home-hero", type: "text" },
    { key: "announcement_text", value: "🎉 Free Shipping on orders above ₹999 | Use Code: SWEET10", section: "home-hero", type: "text" },

    // Home Story Section
    { key: "story_title", value: "Our Roots", section: "home-story", type: "text" },
    { key: "story_subtitle", value: "A Legacy of Tradition & Purity", section: "home-story", type: "text" },
    { key: "story_description", value: "At Siripurapu Vari Sweets, we believe in the power of tradition. Our recipes have been passed down through generations, ensuring that every bite you take is a taste of our rich heritage. We source only the finest organic ingredients directly from farmers who share our commitment to quality.", section: "home-story", type: "text" },
    { key: "story_image_url", value: "/story/village.png", section: "home-story", type: "image" },

    // Footer Section
    { key: "footer_address", value: "Siripurapu Vari Sweets, Main Road, Guntur, Andhra Pradesh - 522001", section: "footer", type: "text" },
    { key: "footer_email", value: "hello@siripurapusweets.com", section: "footer", type: "text" },
    { key: "footer_phone", value: "+91 98765 43210", section: "footer", type: "text" },
    { key: "footer_copyright", value: "© 2024 Siripurapu Vari Sweet Store. All rights reserved.", section: "footer", type: "text" }
];

async function seedContent() {
    try {
        console.log("🌱 Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected");

        console.log("Updating content...");
        for (const item of sampleContent) {
            await Content.findOneAndUpdate(
                { key: item.key },
                item,
                { upsert: true, new: true }
            );
        }

        console.log("✅ Site content successfully seeded!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

seedContent();
