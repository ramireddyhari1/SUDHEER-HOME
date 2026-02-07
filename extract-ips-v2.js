const cp = require('child_process');

try {
    // Use system 'type' commmand to read file, attempting to let shell handle encoding
    const content = cp.execSync('type dns_result.json').toString();
    console.log("Content successfully read. Length:", content.length);

    const regex = /"data":\s*"(\d+\.\d+\.\d+\.\d+)"/g;
    let match;
    let found = false;

    while ((match = regex.exec(content)) !== null) {
        console.log("IP:", match[1]);
        found = true;
    }

    if (!found) {
        console.log("No match found. Content dump (first 300 chars):");
        console.log(content.substring(0, 300));
        console.log("... end dump");
    }
} catch (e) {
    console.error("Error reading file:", e.message);
}
