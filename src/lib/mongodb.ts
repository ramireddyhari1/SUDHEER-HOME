import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true, // Allow buffering to prevent immediate failures during reconnects
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip IPv6
        };

        console.log("Creating new MongoDB connection bundle...");
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            console.log("✅ MongoDB Configuration Loaded");
            return mongoose;
        }).catch(err => {
            console.error("❌ MongoDB Initial Connection Failed:", err.message);
            // Don't cache failed promises
            cached.promise = null;
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

// Handle connection events for debugging
mongoose.connection.on("connected", () => console.log("🟢 Mongoose connected to DB"));
mongoose.connection.on("error", (err) => console.error("🔴 Mongoose connection error:", err));
mongoose.connection.on("disconnected", () => console.log("🟠 Mongoose disconnected"));

export default dbConnect;
