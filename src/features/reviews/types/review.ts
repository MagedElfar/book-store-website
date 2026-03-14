import { User } from "@/features/auth/types/user";

export interface Review {
    id: string;
    book_id: string;
    user_id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    updated_at: string;

    user?: User
}

