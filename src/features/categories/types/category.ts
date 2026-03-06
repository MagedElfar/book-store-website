export interface Category {
    id: string;
    created_at: string;
    name_ar: string;
    name_en: string;
    description_ar: string | null;
    description_en: string | null;
    slug: string;
    image_url: string | null;
    banner_url: string | null;
    is_in_nav?: boolean
    is_active: boolean;
    is_featured: boolean
}