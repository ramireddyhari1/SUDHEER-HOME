const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Initialize WhatsApp Client with Puppeteer
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- helps on windows
            '--disable-gpu'
        ],
        timeout: 60000 // Increase browser launch timeout
    },
    authTimeoutMs: 60000, // Wait longer for auth
    qrMaxRetries: 5       // Allow retries
});

let isReady = false;

// Generate QR Code
client.on('qr', (qr) => {
    console.log('\n=============================================================');
    console.log('SCAN THIS QR CODE WITH YOUR WHATSAPP TO LOGIN');
    console.log('=============================================================\n');
    qrcode.generate(qr, { small: true });
    console.log('\n=============================================================');
    console.log('Open WhatsApp on your phone:');
    console.log('Settings → Linked Devices → Link a Device');
    console.log('=============================================================\n');
});

client.on('ready', () => {
    isReady = true;
    console.log('\n✅ WhatsApp Client is Ready!');
    console.log(`🚀 Server listening on http://localhost:${port}`);
    console.log('📱 You can now send WhatsApp messages automatically!\n');
});

client.on('authenticated', () => {
    console.log('✅ Authenticated successfully!');
});

client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failure:', msg);
    console.log('💡 Try deleting the .wwebjs_auth folder and scanning the QR code again.');
});

client.on('disconnected', (reason) => {
    console.log('⚠️  WhatsApp client disconnected:', reason);
    isReady = false;
});

// API Endpoint to Send Message
app.post('/send-message', async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ success: false, error: 'Phone and message are required' });
    }

    if (!isReady) {
        return res.status(503).json({
            success: false,
            error: 'WhatsApp client not ready. Please scan the QR code first.'
        });
    }

    try {
        // Format phone number: clean non-digits, ensure country code
        let cleanPhone = phone.replace(/\D/g, '');
        if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
            cleanPhone = '91' + cleanPhone; // Default to India +91 if missing
        }

        // WhatsApp ID format: number@c.us
        const chatId = `${cleanPhone}@c.us`;

        // Send
        await client.sendMessage(chatId, message);
        console.log(`📤 Message sent to ${cleanPhone}`);
        return res.json({ success: true, message: 'Message sent successfully' });

    } catch (error) {
        console.error('❌ Failed to send message:', error);
        return res.status(500).json({ success: false, error: 'Failed to send message', details: error.toString() });
    }
});

// Health check endpoint
app.get('/status', (req, res) => {
    res.json({
        ready: isReady,
        message: isReady ? 'WhatsApp client is ready' : 'WhatsApp client not authenticated. Scan QR code.'
    });
});

// Start Client
console.log('🔄 Initializing WhatsApp Client...');
console.log('⏳ This may take 30-60 seconds to download Chromium if first run...\n');

client.initialize().catch(err => {
    console.error('❌ Failed to initialize WhatsApp client:', err);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Make sure Puppeteer is installed: npm install puppeteer');
    console.log('   2. Delete .wwebjs_auth and .wwebjs_cache folders');
    console.log('   3. Restart this script\n');
});

// Start Server
app.listen(port, () => {
    console.log(`🌐 Server started on port ${port}`);
    console.log('⏳ Waiting for WhatsApp client to initialize...\n');
});
