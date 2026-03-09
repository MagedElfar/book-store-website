import type { BookApiProvider, Book, BookParams } from "../types";
import type { GetManyResponse } from "@/shared/types";
import { supabaseFetch, supabaseFetchSingle } from "@/shared/utils/supabase/fetch-client";

export const supabaseBookProvider: BookApiProvider = {

    getBooks: async function (params: BookParams): Promise<GetManyResponse<Book>> {
        const hasCategoryFilter = !!(params?.category_id || (params?.category_ids && params.category_ids.length > 0));
        const hasAuthorFilter = !!(params?.author_id || (params?.author_ids && params.author_ids.length > 0));
        const hasTagFilter = !!(params?.tagId || (params?.tag_ids && params.tag_ids.length > 0));

        const select = `
        *,
        book_categories${hasCategoryFilter ? '!inner' : ''}(category_id),
        book_authors${hasAuthorFilter ? '!inner' : ''}(
            author_id,
            authors(id, name_en, name_ar)
        ),
        book_tags${hasTagFilter ? '!inner' : ''}(
            tag_id,
            tags(id, name_en, name_ar, slug, color, is_pained)
        )
    `.replace(/\s+/g, "");

        const queryParams: Record<string, string | number | boolean | undefined> = {
            select,
            is_active: "eq.true",
        };

        if (params?.search) {
            queryParams.or = `(title_en.ilike.%${params.search}%,title_ar.ilike.%${params.search}%)`;
        }

        if (params?.category_ids && params.category_ids.length > 0) {
            queryParams["book_categories.category_id"] = `in.(${params.category_ids.join(",")})`;
        } else if (params?.category_id) {
            queryParams["book_categories.category_id"] = `eq.${params.category_id}`;
        }

        if (params?.author_ids && params.author_ids.length > 0) {
            queryParams["book_authors.author_id"] = `in.(${params.author_ids.join(",")})`;
        } else if (params?.author_id) {
            queryParams["book_authors.author_id"] = `eq.${params.author_id}`;
        }

        if (params?.tag_ids && params.tag_ids.length > 0) {
            queryParams["book_tags.tag_id"] = `in.(${params.tag_ids.join(",")})`;
        } else if (params?.tagId) {
            queryParams["book_tags.tag_id"] = `eq.${params.tagId}`;
        }

        if (params?.minPrice && params?.maxPrice) {

            delete queryParams.price;
            queryParams.and = `(price.gte.${params.minPrice},price.lte.${params.maxPrice})`;
        } else if (params?.minPrice) {
            queryParams.price = `gte.${params.minPrice}`;
        } else if (params?.maxPrice) {
            queryParams.price = `lte.${params.maxPrice}`;
        }

        const currentLang = params?.lang || "en";
        let orderString = "";
        switch (params?.sortBy) {
            case "oldest": orderString = "created_at.asc"; break;
            case "price_high": orderString = "price.desc"; break;
            case "price_low": orderString = "price.asc"; break;
            case "stock_high": orderString = "stock.desc"; break;
            case "stock_low": orderString = "stock.asc"; break;
            case "alpha": orderString = `title_${currentLang}.asc`; break;
            case "newest": orderString = "created_at.desc"; break;
            case "sales_count":
            default:
                orderString = "sales_count.desc.nullslast"; break;
        }
        queryParams.order = `${orderString},id.desc`;

        if (params?.isOffers) {
            queryParams.sale_price = "gt.0";
            if (!params?.sortBy) {
                queryParams.order = "sale_price.asc,id.desc";
            }
        }

        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const response = await supabaseFetch<GetManyResponse<any>>("books", {
            params: queryParams,
            headers: {
                "Prefer": "count=exact",
                "Range": `${from}-${to}`,
            },
            revalidate: 3600,
            tags: ["books-list"]
        });

        const items = (response.items || []).map(b => ({
            ...b,
            authors: b.book_authors?.map((ba: any) => ba.authors).filter(Boolean) || [],
            tags: b.book_tags?.map((bt: any) => bt.tags).filter(Boolean) || [],
        }));

        return {
            items,
            total: response.total || 0
        };
    },


    getBookBySlug: async function (slug: string): Promise<Book | null> {
        const queryParams = {
            slug: `eq.${slug}`,
            select: `
            *,
            book_images(id, book_id, image_url, display_order),
            book_categories(categories(id, name_en, name_ar, slug)),
            book_authors(authors(id, name_en, name_ar, slug)),
            book_tags(tags(id, name_en, name_ar , color))
        `.replace(/\s+/g, ""),
            "book_images.order": "display_order.asc"
        };

        const bookRaw = await supabaseFetchSingle<any>("books", {
            params: queryParams,
            revalidate: 3600,
            tags: [`book-${slug}`]
        });

        if (!bookRaw) return null;

        return {
            ...bookRaw,
            authors: bookRaw.book_authors?.map((ba: any) => ba.authors).filter(Boolean) || [],
            categories: bookRaw.book_categories?.map((bc: any) => bc.categories).filter(Boolean) || [],
            tags: bookRaw.book_tags?.map((bt: any) => bt.tags).filter(Boolean) || [],
            book_images: bookRaw.book_images || []
        };
    }
};