
import mongoose, { Schema, model, models } from 'mongoose';

const SiteContentSchema = new Schema({
    sectionId: { type: String, required: true, unique: true }, // e.g., 'home-hero', 'about-story'
    content: { type: Schema.Types.Mixed, default: {} }, // Flexible JSON storage
    updatedAt: { type: Date, default: Date.now }
});

const SiteContent = models.SiteContent || model('SiteContent', SiteContentSchema);

export default SiteContent;
