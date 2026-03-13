/* eslint-disable no-console */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Book } from '@/features/books/types/book';
import { upsertItemsApi, removeItemApi, getCartApi, clearCartApi } from '@/features/cart/api/actions';
import { CartItem } from '@/features/cart/types/cart';

interface CartState {
    items: CartItem[];
    isLoading: boolean;

    addItem: (book: Book, userId?: string) => Promise<void>;
    removeItem: (bookId: string, userId?: string) => Promise<void>;
    updateQuantity: (bookId: string, quantity: number, userId?: string) => Promise<void>;

    mergeCart: (userId: string) => Promise<void>;
    setItems: (items: CartItem[]) => void;
    clearCart: (userId?: string) => Promise<void>;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isLoading: true,

            addItem: async (book, userId) => {
                const previousItems = get().items;
                const existingItem = previousItems.find((i) => i.bookId === book.id);
                const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

                const updatedItems = existingItem
                    ? previousItems.map((i) => i.bookId === book.id ? { ...i, quantity: newQuantity } : i)
                    : [...previousItems, { bookId: book.id, book, quantity: 1 }];

                set({ items: updatedItems });

                if (userId) {
                    try {
                        await upsertItemsApi([{
                            user_id: userId,
                            book_id: book.id,
                            quantity: newQuantity
                        }]);
                    } catch (error) {
                        set({ items: previousItems });
                        console.error("Optimistic Update failed (addItem):", error);
                    }
                }
            },

            updateQuantity: async (bookId, quantity, userId) => {
                if (quantity < 1) return;

                const previousItems = get().items;
                const updatedItems = previousItems.map((i) =>
                    i.bookId === bookId ? { ...i, quantity } : i
                );

                set({ items: updatedItems });

                if (userId) {
                    try {
                        await upsertItemsApi([{
                            user_id: userId,
                            book_id: bookId,
                            quantity
                        }]);
                    } catch (error) {
                        set({ items: previousItems });
                        console.error("Optimistic Update failed (updateQuantity):", error);
                    }
                }
            },

            // 3. حذف منتج مع Optimistic Update & Rollback
            removeItem: async (bookId, userId) => {
                const previousItems = get().items;
                set({ items: previousItems.filter((i) => i.bookId !== bookId) });

                if (userId) {
                    try {
                        await removeItemApi(userId, bookId);
                    } catch (error) {
                        set({ items: previousItems });
                        console.error("Optimistic Update failed (removeItem):", error);
                    }
                }
            },

            // 4. دمج سلة الضيف مع الحساب (Login Sync)
            mergeCart: async (userId) => {
                set({ isLoading: true });
                try {
                    const localItems = get().items;

                    if (localItems.length > 0) {
                        const payload = localItems.map(item => ({
                            user_id: userId,
                            book_id: item.bookId,
                            quantity: item.quantity
                        }));
                        await upsertItemsApi(payload);
                    }

                    const serverItems = await getCartApi(userId);
                    set({ items: serverItems });
                } catch (error) {
                    console.error("Failed to merge cart:", error);
                } finally {
                    set({ isLoading: false });
                }
            },

            setItems: (items) => set({ items }),

            clearCart: async (userId) => {
                const previousItems = get().items;
                set({ items: [] });
                if (userId) {
                    try {
                        await clearCartApi(userId);
                    } catch (error) {
                        set({ items: previousItems });
                        console.error("Failed to clear cart:", error);
                    }
                }
            }
        }),
        {
            name: 'cart-storage',
            skipHydration: true,
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.isLoading = true;
                }
            },
        }
    )
);