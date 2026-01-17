const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
}

console.log('Testing MongoDB Connection with URI length:', MONGODB_URI.length);
console.log('URI starts with:', MONGODB_URI.substring(0, 15) + '...');

async function testConnection() {
    try {
        console.log('Connecting...');
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connection Successful!');

        console.log('State:', mongoose.connection.readyState);
        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

        await mongoose.disconnect();
        console.log('Disconnected properly.');
    } catch (error) {
        console.error('❌ Connection Failed:', error);
    }
}

testConnection();
