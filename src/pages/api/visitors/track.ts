import type { APIRoute } from "astro";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const POST: APIRoute = async ({ request, clientAddress }) => {
    try {
        const userAgent = request.headers.get("user-agent") || "Unknown";
        const referer = request.headers.get("referer") || "Direct";

        // Get IP address (clientAddress from Astro)
        const ipAddress = clientAddress || "Unknown";

        // Insert visitor record
        const { error } = await supabaseAdmin
            .from("visitors")
            .insert({
                ip_address: ipAddress,
                user_agent: userAgent,
                referer: referer,
                visited_at: new Date().toISOString(),
            });

        if (error) {
            console.error("Error tracking visitor:", error);
            return new Response(
                JSON.stringify({ error: "Failed to track visitor" }),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in visitor tracking:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
};
