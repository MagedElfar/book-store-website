function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        console.warn(`⚠️ Missing environment variable: ${name}`);
        return "";
    }

    return value;
}

export const env = {
    supabaseUrl: getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    supabaseKey: getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    supabaseProjectId: getEnv("NEXT_PUBLIC_SUPABASE_PROJECT_ID"),
} as const;