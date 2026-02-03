import { Resend } from 'resend';

// Initialize Resend with API Key 
// (Fallback to a placeholder if not set to prevent crash during build, but sending will fail until set)
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Vaishnavi Organics <onboarding@resend.dev>', // Use default testing domain until custom domain is verified
            to: [to],
            subject: subject,
            html: html,
        });

        if (error) {
            console.error("Resend API Error:", error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Email Sending Error:", error);
        return { success: false, error };
    }
};
