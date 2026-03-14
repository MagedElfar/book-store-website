"use client";

import { ShoppingCart, ShoppingBag } from "lucide-react";

import { Link } from "@/i18n/routing";
import { Button } from "@/shared/components/shadcn/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/components/shadcn/sheet";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { formatPrice } from "@/shared/utils/helper";
import { useCartStore } from "@/store/use-cart-store";

import { CartIcon } from "./CartIcon";
import { CartItem } from "./CartItem";
import { useCartTotal } from "../hooks/useCartTotal";

export const CartDrawer = () => {
    const { items } = useCartStore();
    const { t, lang, dir } = useAppTranslation("cart");

    const subtotal = useCartTotal()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="p-0 h-auto w-auto bg-transparent hover:bg-transparent cursor-pointer" // تصفير المسافات تماماً
                >
                    <CartIcon />
                </Button>
            </SheetTrigger>

            <SheetContent
                side={dir === "rtl" ? "right" : "left"}
                className="flex flex-col w-full sm:max-w-md p-0 gap-0"
            >
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        {t("title")} ({items.length})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6">
                    {items.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {items.map((item) => (
                                <CartItem key={item.bookId} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center gap-4 opacity-50">
                            <ShoppingBag size={64} strokeWidth={1} />
                            <p className="text-lg font-medium">{t("emptyMessage")}</p>
                            <Button asChild variant="outline">
                                <Link href="/books">{t("continueShopping")}</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t bg-slate-50/50 dark:bg-zinc-900/50">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-base font-medium text-slate-500">
                                {t("subtotal")}
                            </span>
                            <span className="text-2xl font-black tabular-nums">
                                {formatPrice(subtotal, lang)}
                            </span>
                        </div>

                        <SheetClose asChild>
                            <Button className="w-full h-14 text-lg font-bold rounded-xl" asChild>
                                <Link href="/checkout">
                                    {t("checkout")}
                                </Link>
                            </Button>
                        </SheetClose>

                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};