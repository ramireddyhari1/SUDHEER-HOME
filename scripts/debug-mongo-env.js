require('dotenv').config({ path: '.env.local' });
console.log("---------------------------------------------------");
console.log("DEBUGGING MONGODB CONNECTION");
console.log("---------------------------------------------------");
console.log("Effective MONGODB_URI:", process.env.MONGODB_URI);
console.log("---------------------------------------------------");

const mongoose = require('mongoose');

// Attempt connection
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("✅ Connection Successful!");
    process.exit(0);
}).catch(err => {
    console.error("❌ Connection Failed:");
    console.error(err);
    process.exit(1);
});
