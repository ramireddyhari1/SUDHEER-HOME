import nodemailer from 'nodemailer';

// Shared Transporter
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'agentcat31@gmail.com',
        pass: 'zmek zage mbhf btkq'
    }
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
