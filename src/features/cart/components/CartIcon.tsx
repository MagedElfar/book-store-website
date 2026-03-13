"use client";

import { ShoppingCart } from "lucide-react";

import { useCartCount } from "@/features/cart/hooks/useCartCount";
import { Link } from "@/i18n/routing";
import { Skeleton } from "@/shared/components/shadcn/skeleton";
import { useCartStore } from "@/store/use-cart-store";

export const CartIcon = () => {

    const itemsCount = useCartCount()
    const isLoading = useCartStore((s) => s.isLoading);

    return (
        <div
            className="p-2.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full relative transition-colors group"
        >
            <ShoppingCart size={22} className="group-hover:text-primary transition-colors text-zinc-700 dark:text-zinc-300" />

            {isLoading ?
                <Skeleton className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full border-2 border-white dark:border-zinc-950" />
                :
                <span className={`
                absolute 
                -top-1 -right-1 
                min-w-[18px] h-[18px] px-1
                text-[12px] font-bold tabular-nums
                flex items-center justify-center 
                rounded-full 
                ring-[2.5px] ring-white dark:ring-zinc-950 
                ${itemsCount > 0
                        ? 'bg-red-600 text-white shadow-md animate-in zoom-in duration-300'
                        : 'bg-zinc-600 text-zinc-100'
                    }
            `}>
                    {itemsCount > 9 ? "+9" : itemsCount}
                </span>
            }
        </div>
    );
};