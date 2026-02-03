/**
 * Helper script to set partner password via API
 * Usage: node scripts/set-partner-password.js [partnerId] [password]
 */

const partnerId = process.argv[2];
const password = process.argv[3] || 'test123';
const hasAccess = true;

if (!partnerId) {
    console.error('Usage: node scripts/set-partner-password.js [partnerId] [password]');
    console.error('Example: node scripts/set-partner-password.js 65abc123def456 mypassword');
    process.exit(1);
}

const apiUrl = `http://localhost:3000/api/partners/${partnerId}/set-password`;

fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, hasAccess }),
})
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('✅ Password set successfully!');
            console.log('Partner can now login at: http://localhost:3000/partners/login');
            console.log(`Use password: ${password}`);
        } else {
            console.error('❌ Error:', data.error);
        }
    })
    .catch(err => {
        console.error('❌ Request failed:', err.message);
    });
