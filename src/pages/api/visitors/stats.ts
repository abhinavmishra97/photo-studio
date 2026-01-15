import type { APIRoute } from "astro";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const GET: APIRoute = async () => {
    try {
        // Get total unique visitors (count all records)
        const { count: totalVisitors, error: totalError } = await supabaseAdmin
            .from("visitors")
            .select("*", { count: "exact", head: true });

        if (totalError) throw totalError;

        // Get today's visitors
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const { count: todayVisitors, error: todayError } = await supabaseAdmin
            .from("visitors")
            .select("*", { count: "exact", head: true })
            .gte("visited_at", today.toISOString());

        if (todayError) throw todayError;

        // Get this week's visitors
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        weekAgo.setHours(0, 0, 0, 0);

        const { count: weekVisitors, error: weekError } = await supabaseAdmin
            .from("visitors")
            .select("*", { count: "exact", head: true })
            .gte("visited_at", weekAgo.toISOString());

        if (weekError) throw weekError;

        // Get this month's visitors
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        monthAgo.setHours(0, 0, 0, 0);

        const { count: monthVisitors, error: monthError } = await supabaseAdmin
            .from("visitors")
            .select("*", { count: "exact", head: true })
            .gte("visited_at", monthAgo.toISOString());

        if (monthError) throw monthError;

        return new Response(
            JSON.stringify({
                total: totalVisitors || 0,
                today: todayVisitors || 0,
                week: weekVisitors || 0,
                month: monthVisitors || 0,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching visitor stats:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch visitor statistics" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
};
