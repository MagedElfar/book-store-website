/* eslint-disable @typescript-eslint/no-unused-vars */

import { env } from "../config/env";


// src/shared/utils/supabase/fetch-client.ts


interface FetchOptions extends RequestInit {
    tags?: string[];
    revalidate?: number;
    params?: Record<string, string | number | boolean | undefined>;
}

export async function supabaseFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    try {
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

        // إعداد الـ Promises
        const dataPromise = fetch(url.toString(), {
            ...restOptions,
            headers: {
                "apikey": env.supabaseKey,
                "Authorization": `Bearer ${env.supabaseKey}`,
                "Content-Type": "application/json",
                ...headers,
                "Prefer": headers["Prefer"]?.replace(/count=(exact|planned|estimated),?/, "") || ""
            },
            next
        });

        const promises: Promise<Response>[] = [dataPromise];

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

        const responses = await Promise.all(promises);
        const [dataRes, countRes] = responses;

        // التحقق من حالة الـ Response
        if (!dataRes.ok || (countRes && !countRes.ok)) {
            const errorRes = !dataRes.ok ? dataRes : countRes;
            return { items: [], total: 0 } as T; // رجع داتا فاضية بدل Error
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

    } catch (error: any) {
        return {
            items: [],
            total: 0
        } as T;
    }
}
export async function supabaseFetchSingle<T>(endpoint: string, options: FetchOptions = {}): Promise<T | null> {
    const headers = (options.headers || {}) as Record<string, string>;

    try {
        const result = await supabaseFetch<any>(endpoint, {
            ...options,
            headers: {
                ...headers,
                "Accept": "application/vnd.pgrst.object+json",
            },
        });

        if (!result || !result.items || (Array.isArray(result.items) && result.items.length === 0)) {
            return null;
        }

        const data = Array.isArray(result.items) ? result.items[0] : result.items;

        if (data && Object.keys(data).length === 0) return null;

        return data as T;

    } catch (error: any) {
        if (error.message?.includes("406") || error.message?.includes("404")) {
            return null;
        }
        return null;
    }
}