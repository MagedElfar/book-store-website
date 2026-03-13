import { useCartStore } from "@/store/use-cart-store";

export const useCartTotal = () => {
    return useCartStore((state) =>
        state.items.reduce((acc, item) => {
            const price = item.book.sale_price ?? item.book.price;
            return acc + (price * item.quantity);
        }, 0)
    );
};