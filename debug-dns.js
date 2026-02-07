
const dns = require('dns');
const url = require('url');

// Read .env.local manually since we can't trust the environment output
const fs = require('fs');
const path = require('path');

try {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const uriMatch = envContent.match(/MONGODB_URI=(.*)/);

    if (!uriMatch) {
        console.error("❌ MONGODB_URI not found in .env.local");
        process.exit(1);
    }

    let rawUri = uriMatch[1].trim();
    // primitive cleanup of quotes if present
    if ((rawUri.startsWith('"') && rawUri.endsWith('"')) || (rawUri.startsWith("'") && rawUri.endsWith("'"))) {
        rawUri = rawUri.slice(1, -1);
    }

    console.log("🔍 Checking URI Structure...");
    if (rawUri.includes("+srv")) {
        console.log("   Type: SRV Connection (mongodb+srv://)");
    } else {
        console.log("   Type: Standard Connection (mongodb://)");
    }

    // Parse host
    // mongodb+srv://user:pass@cluster0.abcde.mongodb.net/...
    const hostMatch = rawUri.match(/@([^/?]+)/);
    if (!hostMatch) {
        console.error("❌ Could not extract hostname from URI. Check format.");
        console.log("   URI pattern seen: " + rawUri.substring(0, 15) + "...");
        process.exit(1);
    }

    const hostname = hostMatch[1];
    console.log(`🔍 Resolving DNS for host: ${hostname}`);

    dns.resolve(hostname, (err, records) => {
        if (err) {
            console.error("❌ DNS Resolution FAILED");
            console.error("   Error code:", err.code);
            console.error("   This confirms your network/ISP is blocking MongoDB SRV records.");
            console.log("\n💡 SOLUTION: You must use the Standard Connection String (non-SRV).");
            console.log("   Format: mongodb://host1:27017,host2:27017/dbName?replicaSet=rs0&ssl=true");
        } else {
            console.log("✅ DNS Resolution SUCCESS");
            console.log("   Records:", records);
            console.log("   If DNS works, check your IP Whitelist in Atlas.");
        }
    });

} catch (e) {
    console.error("Error reading .env.local:", e.message);
}
