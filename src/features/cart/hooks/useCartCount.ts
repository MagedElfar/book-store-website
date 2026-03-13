import { useCartStore } from "@/store/use-cart-store";

export const useCartCount = () => {
    return useCartStore((state) =>
        state.items.reduce((acc, item) => acc + item.quantity, 0)
    );
};