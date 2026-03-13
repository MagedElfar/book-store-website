import { useMemo } from "react";

import { useCartStore } from "@/store/use-cart-store";

export const useGetCartItemByBook = (bookId: string) => {
    const items = useCartStore(s => s.items)
    return useMemo(() => items.find(c => c.bookId === bookId) || null, [bookId, items])
};