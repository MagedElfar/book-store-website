"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { CartItem as CartItemType } from "@/features/cart/types/cart";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { formatPrice } from "@/shared/utils/helper";
import { useCartStore } from "@/store/use-cart-store";

interface Props {
    item: CartItemType;
}

export function CartItem({ item }: Props) {
    const { updateQuantity, removeItem } = useCartStore();
    const { user } = useAuthState();
    const { t, lang, getLocalizedValue } = useAppTranslation("cart");

    // استخراج اسم الكتاب المترجم
    const bookTitle = getLocalizedValue(item.book, "title");

    const handleIncrease = () => {
        updateQuantity(item.bookId, item.quantity + 1, user?.id);
    };

    const handleDecrease = () => {
        if (item.quantity > 1) {
            updateQuantity(item.bookId, item.quantity - 1, user?.id);
        }
    };

    const handleRemove = () => {
        removeItem(item.bookId, user?.id);
    };

    return (
        <div className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* صورة الكتاب */}
            <div className="relative aspect-[2/3] w-20 flex-shrink-0 overflow-hidden rounded-lg border bg-slate-50 dark:bg-zinc-900">
                <Image
                    src={item.book?.cover_image || "/images/img-ph.jpg"}
                    alt={bookTitle}
                    fill
                    className="object-cover"
                    sizes="80px"
                />
            </div>

            {/* تفاصيل الكتاب */}
            <div className="flex flex-1 flex-col justify-between py-0.5">
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-sm line-clamp-2 leading-tight">
                            {bookTitle}
                        </h3>
                        <button
                            onClick={handleRemove}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1 -mt-1"
                            title={t("actions.remove")}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        {/* هنا بنعرض سعر النسخة الواحدة */}
                        {formatPrice(item.book.sale_price || item.book.price, lang)}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                    {/* تحكم الكمية */}
                    <div className="flex items-center border rounded-lg bg-white dark:bg-zinc-950">
                        <button
                            onClick={handleDecrease}
                            disabled={item.quantity <= 1}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-900 disabled:opacity-20 transition-colors rounded-l-lg"
                        >
                            <Minus size={14} />
                        </button>

                        <span className="w-8 text-center text-sm font-bold tabular-nums">
                            {item.quantity}
                        </span>

                        <button
                            onClick={handleIncrease}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors rounded-r-lg"
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    <span className="font-black text-sm tabular-nums text-blue-600 dark:text-blue-400">
                        {formatPrice((item.book.sale_price || item.book.price) * item.quantity, lang)}
                    </span>
                </div>
            </div>
        </div>
    );
}