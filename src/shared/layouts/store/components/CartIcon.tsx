"use client";

import { Link } from "@/i18n/routing";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export const CartIcon = () => {
    const [itemsCount, setItemsCount] = useState(5);

    return (
        <Link
            href="/cart"
            className="p-2.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full relative transition-colors group"
        >
            <ShoppingCart size={22} className="group-hover:text-primary transition-colors text-zinc-700 dark:text-zinc-300" />

            <span className={`
                absolute 
                -top-1 -right-1 
                min-w-[20px] h-[20px] px-1.5
                text-[11px] font-black /* جعلنا الخط أسمك */
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
        </Link>
    );
};