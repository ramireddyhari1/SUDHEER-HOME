const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3001; // Using 3001 to avoid conflict with Next.js on 3000

// Initialize the client with LocalAuth for session persistence
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Scan QR with WhatsApp');
});

client.on('ready', () => {
    console.log('WhatsApp Client Ready!');
});

client.on('authenticated', () => {
    console.log('WhatsApp Client Authenticated!');
});

client.initialize();

app.post('/send', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ status: 'error', message: 'Number and message are required' });
    }

    try {
        // Ensure number is in correct format (with regex or simple check)
        // whatsapp-web.js expects '1234567890@c.us'
        // If user sends '919876543210', we append '@c.us'
        const chatId = number.includes('@c.us') ? number : `${number}@c.us`;

        await client.sendMessage(chatId, message);
        res.json({ status: 'sent' });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ status: 'failed', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
