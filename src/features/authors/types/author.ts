export interface Author {
    id: string;
    created_at: string;
    updated_at: string;
    name_ar: string;
    name_en: string;
    slug: string;
    bio_ar: string | null;
    bio_en: string | null;
    image_url: string | null;
    birth_date: string | null;
    books_count: number
    is_active: boolean;
}