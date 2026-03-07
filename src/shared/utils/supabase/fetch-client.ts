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

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, String(value));
            }
        });
    }

    const headers = (restOptions.headers || {}) as Record<string, string>;
    const next = { tags, revalidate };

    const shouldFetchCount = headers["Prefer"]?.includes("count");

    const promises = [
        fetch(url.toString(), {
            ...restOptions,
            headers: {
                "apikey": env.supabaseKey,
                "Authorization": `Bearer ${env.supabaseKey}`,
                "Content-Type": "application/json",
                ...headers,
                "Prefer": headers["Prefer"]?.replace(/count=(exact|planned|estimated),?/, "") || ""
            },
            next
        })
    ];

    if (shouldFetchCount) {
        promises.push(
            fetch(url.toString(), {
                method: 'HEAD',
                headers: {
                    "apikey": env.supabaseKey,
                    "Authorization": `Bearer ${env.supabaseKey}`,
                    "Prefer": "count=exact",
                },
                next
            })
        );
    }

    const [dataRes, countRes] = await Promise.all(promises);

    if (!dataRes.ok || (countRes && !countRes.ok)) {
        const errorRes = !dataRes.ok ? dataRes : countRes;
        const errorBody = await errorRes.json().catch(() => ({}));
        throw new Error(
            `Supabase Fetch Error: ${errorBody.message || errorRes.statusText} (${errorRes.status})`
        );
    }

    const data = await dataRes.json();
    let totalCount = 0;

    if (countRes) {
        const contentRange = countRes.headers.get("content-range");
        totalCount = contentRange ? parseInt(contentRange.split("/")?.[1] || "0") : 0;
    }

    return {
        items: data || [],
        total: totalCount
    } as T;
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