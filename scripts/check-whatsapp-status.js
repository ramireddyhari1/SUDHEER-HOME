// Quick script to check WhatsApp server status
const fetch = require('node-fetch');

async function checkStatus() {
    try {
        const response = await fetch('http://localhost:3001/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: '1234567890',
                message: 'Test'
            })
        });

        const data = await response.json();
        console.log('WhatsApp Server Response:', data);

        if (data.success) {
            console.log('✅ WhatsApp server is working!');
        } else {
            console.log('❌ WhatsApp server responded but with error:', data.error);
        }
    } catch (error) {
        console.log('❌ Cannot connect to WhatsApp server on port 3001');
        console.log('   Error:', error.message);
        console.log('\n💡 Make sure to run: node scripts/whatsapp-server.js');
    }
}

checkStatus();
