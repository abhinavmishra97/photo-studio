// API endpoint to add a new customer
import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabaseAdmin.js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { name, spouse_name, phone, email, birthday, anniversary, location, city, notes } = body;

        // Validate required fields
        if (!name || !phone) {
            return new Response(JSON.stringify({ error: 'Name and phone are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Insert customer
        const { data, error } = await supabaseAdmin
            .from('customers')
            .insert([{ name, spouse_name, phone, email, birthday, anniversary, location, city, notes }])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Error adding customer:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
