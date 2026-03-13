'use client'

import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useState } from "react";

import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { useGetCartItemByBook } from "@/features/cart/hooks/useGetCartItemByBook";
import { Button } from "@/shared/components/shadcn/button";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";
import { useCartStore } from "@/store/use-cart-store";

import { Book } from "../types/book";

interface Props {
    stock: number,
    book: Book
}

export function BookActions({ stock, book }: Props) {
    const updateQuantity = useCartStore(s => s.updateQuantity)
    const addItem = useCartStore(s => s.addItem)
    const item = useGetCartItemByBook(book.id)

    const { user } = useAuthState()
    const { t } = useAppTranslation("books");
    const [quantity, setQuantity] = useState(item?.quantity || 1);
    const isInStock = stock > 0;

    const handleAddToCart = () => {
        const userId = user?.id
        if (item) {
            updateQuantity(book.id, quantity, userId)
        } else {
            addItem(book, userId)
        }
    }

    return (
        <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
                {isInStock && (
                    <div>
                        <div className="flex items-center justify-between border-2 border-slate-100 dark:border-zinc-800 rounded-xl px-2 h-[56px] min-w-[140px] bg-slate-50/50 dark:bg-zinc-900/30">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                disabled={quantity <= 1}
                                className="p-2 cursor-pointer hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-colors text-slate-600 disabled:opacity-20"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-lg px-4 tabular-nums">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => Math.min(stock, q + 1))}
                                disabled={quantity >= stock}
                                className="p-2 cursor-pointer hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-colors text-slate-600 disabled:opacity-20"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mt-2 px-1">
                            <span className="relative flex h-2 w-2">
                                <span className={cn(
                                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                                    stock > 5 ? "bg-emerald-400" : "bg-amber-400"
                                )}></span>
                                <span className={cn(
                                    "relative inline-flex rounded-full h-2 w-2",
                                    stock > 5 ? "bg-emerald-500" : "bg-amber-500"
                                )}></span>
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-tight">
                                {stock} {t("details.available")}
                            </span>
                        </div>
                    </div>
                )}

                <Button
                    size="lg"
                    disabled={!isInStock}
                    onClick={handleAddToCart}
                    className={cn(
                        "flex-1 h-[56px] gap-3 shadow-xl border-none rounded-xl active:scale-[0.98] transition-all font-bold text-lg",
                        isInStock
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25"
                            : "bg-slate-200 dark:bg-zinc-800 text-slate-500 cursor-not-allowed shadow-none"
                    )}
                >
                    {isInStock ? (
                        <>
                            <ShoppingCart className="w-6 h-6" />
                            {item ? t("details.updateCart") : t("details.addToCart")}
                        </>
                    ) : (
                        t("details.outOfStock")
                    )}
                </Button>
            </div>
        </div>
    );
}