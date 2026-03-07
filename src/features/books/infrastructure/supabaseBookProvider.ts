import type { BookApiProvider, Book, BookParams } from "../types";
import type { GetManyResponse } from "@/shared/types";
import { supabaseFetch, supabaseFetchSingle } from "@/shared/utils/supabase/fetch-client";

export const supabaseBookProvider: BookApiProvider = {

    getBooks: async function (params: BookParams): Promise<GetManyResponse<Book>> {


        const select = `
            *,
            book_categories${params?.category_id ? '!inner' : ''}(category_id),
            book_authors${params?.author_id ? '!inner' : ''}(
            author_id,
            authors(id, name_en, name_ar)
            ),
            book_tags${params?.tagId ? '!inner' : ''}(
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
        if (params?.author_id) queryParams["book_authors.author_id"] = `eq.${params.author_id}`;
        if (params?.category_id) queryParams["book_categories.category_id"] = `eq.${params.category_id}`;
        if (params?.tagId) queryParams["book_tags.tag_id"] = `eq.${params.tagId}`;

        const currentLang = params?.lang || "en";
        let orderString = "";
        switch (params?.sortBy) {
            case "sales_count": orderString = "sales_count.desc.nullslast"; break;
            case "oldest": orderString = "created_at.asc"; break;
            case "price_high": orderString = "price.desc"; break;
            case "price_low": orderString = "price.asc"; break;
            case "stock_high": orderString = "stock.desc"; break;
            case "stock_low": orderString = "stock.asc"; break;
            case "alpha": orderString = `title_${currentLang}.asc`; break;
            case "newest":
            default: orderString = "created_at.desc"; break;
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
            authors: b.book_authors?.map((bc: any) => bc.authors).filter(Boolean) || [],
            tags: b.book_tags?.map((bt: any) => bt.tags).filter(Boolean) || [],
        }))

        return {
            items,
            total: response.total || 0
        };
    },


    getBookBySlug: async function (slug: string): Promise<Book | null> {
        const queryParams = {
            slug: `eq.${slug}`, // الفلتر بالـ slug
            select: `
            *,
            book_images(id, book_id, image_url, display_order),
            book_categories(categories(id, name_en, name_ar)),
            book_authors(authors(id, name_en, name_ar)),
            book_tags(tags(id, name_en, name_ar))
        `.replace(/\s+/g, ""),
            "book_images.order": "display_order.asc"
        };

        const bookRaw = await supabaseFetchSingle<any>("books", {
            params: queryParams,
            revalidate: 60,
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