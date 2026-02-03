import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testMongoDBConnection() {
    const mongoURI = process.env.MONGODB_URI;

    console.log('🔍 MongoDB Connection Test');
    console.log('================================');
    console.log(`📍 Cluster: cluster0.yasbgfq.mongodb.net`);
    console.log(`👤 Username: ${process.env.DB_USERNAME}`);
    console.log(`🔐 Password: ${process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-2) : 'NOT SET'}`);
    console.log(`📊 Database: ${process.env.DB_NAME}`);
    console.log('================================\n');

    try {
        console.log('⏳ Attempting connection...');

        // Explicitly check for mongoURI
        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined in .env.local");
        }

        const connection = await mongoose.connect(mongoURI as string, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        });

        console.log('✅ Connection Successful!');
        console.log(`\n📌 Connection Details:`);
        console.log(`   - Host: ${connection.connection.host}`);
        console.log(`   - Port: ${connection.connection.port}`);
        console.log(`   - Database: ${connection.connection.name}`);
        console.log(`   - Ready State: ${connection.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);

        // List collections
        const collections = await connection.connection.db?.listCollections().toArray();
        console.log(`\n📚 Collections: ${collections?.length || 0}`);

        await mongoose.disconnect();
        console.log('\n✅ Test Completed Successfully!');
        process.exit(0);

    } catch (error: any) {
        console.error('\n❌ Connection Failed!');
        console.error(`\n🔴 Error: ${error.message}`);

        if (error.message.includes('authentication failed')) {
            console.error('\n💡 Troubleshooting Tips:');
            console.error('   1. Verify username and password in .env.local');
            console.error('   2. Check if special characters need URL encoding');
            console.error('   3. Ensure the database user exists in MongoDB Atlas');
            console.error('   4. Try with simple alphanumeric password first');
        }

        if (error.message.includes('ip not whitelisted')) {
            console.error('\n💡 IP Address Issue:');
            console.error('   Add your current IP to Network Access whitelist');
            console.error('   Or allow all IPs temporarily: 0.0.0.0/0');
        }

        console.error('\n📋 Full Error Details:');
        console.error(error);
        process.exit(1);
    }
}

testMongoDBConnection();
