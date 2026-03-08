export const env = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    supabaseProjectId: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || "",
} as const;

if (!env.supabaseUrl || !env.supabaseKey) {
    if (typeof window !== "undefined") {
        console.warn("⚠️ Supabase Client-side variables are missing!");
    }
}