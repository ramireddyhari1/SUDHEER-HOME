// Run with: node scripts/test-whatsapp.js
// Make sure the WhatsApp API server is running on port 3001

async function run() {
    try {
        const response = await fetch('http://127.0.0.1:3001/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                number: '919876543210', // Replace with a real number for testing
                message: '🔔 This is a test message from your self-hosted WhatsApp API!'
            })
        });

        const data = await response.json();
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

run();
