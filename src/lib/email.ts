import nodemailer from 'nodemailer';

// Shared Transporter
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'agentcat31@gmail.com',
        pass: 'zmek zage mbhf btkq'
    },
    // Force IPv4 and add timeouts to debug better
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    connectionTimeout: 10000, // 10 seconds
    socketTimeout: 10000,
    family: 4 // Force IPv4
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        // Verify connection before sending
        await transporter.verify();

        await transporter.sendMail({
            from: '"Vaishnavi Organics" <agentcat31@gmail.com>',
            to,
            subject,
            html,
        });
        return { success: true };
    } catch (error) {
        console.error("Email Sending Error:", error);
        return { success: false, error };
    }
};
