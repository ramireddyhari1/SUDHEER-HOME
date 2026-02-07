import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || `"Vaishnavi Organics" <${process.env.SMTP_USER}>`,
            to: to,
            subject: subject,
            html: html,
        });

        console.log('Email sent successfully:', info.messageId);
        return { success: true, data: info };
    } catch (error) {
        console.error("Email Sending Error:", error);
        return { success: false, error };
    }
};
