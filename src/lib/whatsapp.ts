// Twilio WhatsApp client for sending automated messages
import twilio from 'twilio';

const accountSid = import.meta.env.TWILIO_ACCOUNT_SID;
const authToken = import.meta.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = import.meta.env.TWILIO_WHATSAPP_FROM; // e.g., 'whatsapp:+14155238886'

if (!accountSid || !authToken || !whatsappFrom) {
    console.warn('Twilio credentials not configured. WhatsApp messages will not be sent.');
}

// Create Twilio client
export const twilioClient = accountSid && authToken
    ? twilio(accountSid, authToken)
    : null;

/**
 * Send a WhatsApp message using Twilio
 * @param to - Phone number in E.164 format (e.g., '+919876543210')
 * @param message - Message text to send
 * @returns Promise with message SID or error
 */
export async function sendWhatsAppMessage(to: string, message: string) {
    if (!twilioClient || !whatsappFrom) {
        throw new Error('Twilio is not configured. Please add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_WHATSAPP_FROM to your environment variables.');
    }

    try {
        // Ensure phone number is in E.164 format
        const formattedTo = formatPhoneNumber(to);

        const messageResponse = await twilioClient.messages.create({
            from: whatsappFrom,
            to: `whatsapp:${formattedTo}`,
            body: message,
        });

        console.log(`✅ WhatsApp message sent to ${formattedTo}. SID: ${messageResponse.sid}`);
        return { success: true, sid: messageResponse.sid };
    } catch (error: any) {
        console.error(`❌ Failed to send WhatsApp message to ${to}:`, error.message);
        throw error;
    }
}

/**
 * Format phone number to E.164 format
 * Assumes Indian numbers if no country code is provided
 */
function formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');

    // If number starts with 0, remove it (Indian mobile numbers)
    if (cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1);
    }

    // If number doesn't start with country code, add +91 for India
    if (!cleaned.startsWith('91') && cleaned.length === 10) {
        cleaned = '91' + cleaned;
    }

    // Add + prefix for E.164 format
    if (!cleaned.startsWith('+')) {
        cleaned = '+' + cleaned;
    }

    return cleaned;
}

/**
 * Get birthday greeting message
 */
export function getBirthdayWhatsAppMessage(name: string): string {
    return `🎉 *Happy Birthday ${name}!* 🎂

Wishing you a day filled with joy, laughter, and wonderful memories!

May this year bring you success, happiness, and all the things you've been dreaming of.

Warm wishes from,
*Ram Photo Studio* 📸

_Capturing your precious moments since years!_`;
}

/**
 * Get anniversary greeting message
 */
export function getAnniversaryWhatsAppMessage(name: string, spouseName?: string): string {
    const couple = spouseName ? `${name} & ${spouseName}` : name;

    return `💕 *Happy Anniversary ${couple}!* 💑

Wishing you both a beautiful day filled with love and cherished memories!

May your bond grow stronger with each passing year, and may you continue to create wonderful moments together.

Warm wishes from,
*Ram Photo Studio* 📸

_Capturing your love story, one frame at a time!_`;
}
