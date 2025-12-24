// API endpoint to update a customer
import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { id, name, phone, birthday, anniversary, notes } = body;

        // Validate required fields
        if (!id) {
            return new Response(JSON.stringify({ error: 'Customer ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Build update object (only include provided fields)
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (phone !== undefined) updateData.phone = phone;
        if (birthday !== undefined) updateData.birthday = birthday;
        if (anniversary !== undefined) updateData.anniversary = anniversary;
        if (notes !== undefined) updateData.notes = notes;

        // Update customer
        const { data, error } = await supabaseAdmin
            .from('customers')
            .update(updateData)
            .eq('id', id)
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
        console.error('Error updating customer:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
