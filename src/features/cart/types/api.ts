import { CartItem } from "./cart";
import { UpsertCartPayload } from "./request";

export interface CartApiProvider {
    getCart: (userId: string) => Promise<CartItem[]>;

    upsertItems: (payload: UpsertCartPayload[]) => Promise<void>;

    removeItem: (userId: string, bookId: string) => Promise<void>;

    clearCart: (userId: string) => Promise<void>;
}