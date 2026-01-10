export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
import { resend } from '../../../lib/resend';
import { getBirthdayEmailHTML, getAnniversaryEmailHTML } from '../../../lib/emailTemplates';
import type { Customer } from '../../../types/customer';

export const GET: APIRoute = async ({ request }) => {
    try {
        // Verify the request is from Vercel Cron or has the correct secret
        const authHeader = request.headers.get('authorization');
        const cronSecret = import.meta.env.CRON_SECRET;

        if (authHeader !== `Bearer ${cronSecret}`) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get today's date (IST timezone)
        const today = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const istDate = new Date(today.getTime() + istOffset);
        const todayMonth = istDate.getMonth() + 1; // 1-12
        const todayDay = istDate.getDate(); // 1-31

        console.log(`Checking for events on ${todayMonth}/${todayDay}`);

        // Fetch all customers from database
        const { data: customers, error: fetchError } = await supabaseAdmin
            .from('customers')
            .select('*');

        if (fetchError) {
            console.error('Error fetching customers:', fetchError);
            return new Response(JSON.stringify({ error: 'Database error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const emailsSent: string[] = [];
        const errors: string[] = [];

        // Check each customer for birthday or anniversary
        for (const customer of (customers as Customer[])) {
            // Skip if no email
            if (!customer.email) continue;

            // Check birthday
            if (customer.birthday) {
                const birthday = new Date(customer.birthday);
                const birthMonth = birthday.getMonth() + 1;
                const birthDay = birthday.getDate();

                if (birthMonth === todayMonth && birthDay === todayDay) {
                    try {
                        await resend.emails.send({
                            from: 'Ram Photo Studio <noreply@ramdigitalphotostudio.com>',
                            to: customer.email,
                            subject: `🎉 Happy Birthday ${customer.name}!`,
                            html: getBirthdayEmailHTML(customer.name),
                        });
                        emailsSent.push(`Birthday email to ${customer.name} (${customer.email})`);
                        console.log(`✅ Birthday email sent to ${customer.name}`);
                    } catch (error: any) {
                        errors.push(`Failed to send birthday email to ${customer.name}: ${error.message}`);
                        console.error(`❌ Failed to send birthday email to ${customer.name}:`, error);
                    }
                }
            }

            // Check anniversary
            if (customer.anniversary) {
                const anniversary = new Date(customer.anniversary);
                const annivMonth = anniversary.getMonth() + 1;
                const annivDay = anniversary.getDate();

                if (annivMonth === todayMonth && annivDay === todayDay) {
                    try {
                        await resend.emails.send({
                            from: 'Ram Photo Studio <noreply@ramdigitalphotostudio.com>',
                            to: customer.email,
                            subject: `💕 Happy Anniversary ${customer.name}!`,
                            html: getAnniversaryEmailHTML(customer.name, customer.spouse_name || undefined),
                        });
                        emailsSent.push(`Anniversary email to ${customer.name} (${customer.email})`);
                        console.log(`✅ Anniversary email sent to ${customer.name}`);
                    } catch (error: any) {
                        errors.push(`Failed to send anniversary email to ${customer.name}: ${error.message}`);
                        console.error(`❌ Failed to send anniversary email to ${customer.name}:`, error);
                    }
                }
            }
        }

        return new Response(JSON.stringify({
            success: true,
            date: `${todayMonth}/${todayDay}`,
            emailsSent: emailsSent.length,
            emails: emailsSent,
            errors: errors.length > 0 ? errors : undefined
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Error in send-greetings cron:', error);
        return new Response(JSON.stringify({
            error: 'Internal server error',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
