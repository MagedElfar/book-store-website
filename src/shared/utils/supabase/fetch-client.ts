// src/shared/utils/supabase/fetch-client.ts

import { env } from "@/shared/config";

interface FetchOptions extends RequestInit {
    tags?: string[];
    revalidate?: number;
    params?: Record<string, string | number | boolean | undefined>;
}

export async function supabaseFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { tags, revalidate, params, ...restOptions } = options;

    const url = new URL(`${env.supabaseUrl}/rest/v1/${endpoint}`);
    console.log("FETCHING:", url.toString())

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, String(value));
            }
        });
    }

    const headers = (restOptions.headers || {}) as Record<string, string>;

    const response = await fetch(url.toString(), {
        ...restOptions,
        headers: {
            "apikey": env.supabaseKey,
            "Authorization": `Bearer ${env.supabaseKey}`,
            "Content-Type": "application/json",
            ...headers,
        },
        next: {
            tags: tags,
            revalidate: revalidate,
        },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(
            `Supabase Fetch Error: ${errorBody.message || response.statusText} (${response.status})`
        );
    }

    if (headers["Prefer"]?.includes("count")) {
        const data = await response.json();
        const count = response.headers.get("content-range")?.split("/")?.[1];
        return { data, count: parseInt(count || "0") } as T;
    }

    return response.json() as T;
}

export async function supabaseFetchSingle<T>(endpoint: string, options: FetchOptions = {}): Promise<T | null> {
    const headers = (options.headers || {}) as Record<string, string>;

    return supabaseFetch<T>(endpoint, {
        ...options,
        headers: {
            ...headers,
            "Accept": "application/vnd.pgrst.object+json",
        },
    }).catch((error) => {
        if (error.message.includes("406") || error.message.includes("404")) {
            return null;
        }
        throw error;
    });
}