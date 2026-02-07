const fs = require('fs');

try {
    // Attempt to read as UTF-16LE since PowerShell output redirection usually creates that
    let content = fs.readFileSync('dns_result.json', 'utf16le');

    // Simple regex to find IPs in the "data" field of the JSON response from dns.google
    // Response format: { ..., "Answer": [ { ..., "data": "1.2.3.4" } ] }
    const regex = /"data"\s*:\s*"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"/g;

    let match;
    const ips = [];
    while ((match = regex.exec(content)) !== null) {
        ips.push(match[1]);
    }

    if (ips.length === 0) {
        console.log("No IPs found. Content snippet:", content.substring(0, 100));
    } else {
        console.log(ips.join(','));
        fs.writeFileSync('ips.txt', ips.join(','));
    }
} catch (err) {
    console.error("Error:", err.message);
}
