import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
// This is optional - only needed if you want to send manual emails
// Automatic greetings now use WhatsApp instead
const apiKey = import.meta.env.RESEND_API_KEY;

let resend: Resend | null = null;

if (apiKey) {
    resend = new Resend(apiKey);
    console.log('✅ Resend email client initialized (for manual emails)');
} else {
    console.warn('⚠️ RESEND_API_KEY not set - email functionality disabled (WhatsApp is used for automatic greetings)');
}

export { resend };
