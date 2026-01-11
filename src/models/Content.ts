
import mongoose, { Schema, model, models } from 'mongoose';

const ContentSchema = new Schema({
    key: { type: String, required: true, unique: true }, // e.g., 'home_hero_title'
    value: { type: Schema.Types.Mixed, required: true }, // Can be string, object, array
    type: { type: String, default: 'text' }, // 'text', 'image', 'json'
    section: { type: String, required: true }, // 'home-hero', 'announcement', etc.
});

const Content = models.Content || model('Content', ContentSchema);

export default Content;
