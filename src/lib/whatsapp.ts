export const sendWhatsAppMessage = async (number: string, message: string) => {
    try {
        const response = await fetch('http://127.0.0.1:3001/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number, message }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to send WhatsApp message:', error);
        return { status: 'failed', error: error instanceof Error ? error.message : 'Unknown error' };
    }
};
