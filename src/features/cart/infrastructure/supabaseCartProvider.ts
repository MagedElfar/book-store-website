import { supabaseClient } from "@/shared/lib/supabaseClient";

import { CartApiProvider } from "../types/api";
import { CartItem } from "../types/cart";
import { UpsertCartPayload } from "../types/request";

export const supabaseCartProvider: CartApiProvider = {
    async getCart(userId: string): Promise<CartItem[]> {
        const { data, error } = await supabaseClient
            .from('cart_items')
            .select(`
                id,
                quantity,
                book_id,
                book:books (
                    id,
                    title_ar,
                    title_en,
                    price,
                    sale_price,
                    cover_image,
                    stock
                )
            `)
            .eq('user_id', userId);

        if (error) {
            throw new Error(error.message);
        }

        return (data || []).map((item: any) => ({
            bookId: item.book_id,
            quantity: item.quantity,
            book: item.book,
        }));
    },

    async upsertItems(payload: UpsertCartPayload[]): Promise<void> {
        const { error } = await supabaseClient
            .from('cart_items')
            .upsert(payload, {
                onConflict: 'user_id,book_id'
            });

        if (error) {
            throw new Error(error.message);
        }
    },

    async removeItem(userId: string, bookId: string): Promise<void> {
        const { error } = await supabaseClient
            .from('cart_items')
            .delete()
            .eq('user_id', userId)
            .eq('book_id', bookId);

        if (error) {
            throw new Error(error.message);
        }
    },

    async clearCart(userId: string): Promise<void> {
        const { error } = await supabaseClient
            .from('cart_items')
            .delete()
            .eq('user_id', userId);

        if (error) {
            throw new Error(error.message);
        }
    }
};