import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export { resend };
