// Supabase admin client for server-side operations only
// NEVER import this in client-side code!
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase admin environment variables. Please check your .env file.');
}

// Admin client - has full access to database (bypasses RLS)
// Only use this in server-side code (API routes, SSR pages)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
