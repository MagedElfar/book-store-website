'use client'

import { CheckCircle2, XCircle, Share2, Heart } from "lucide-react";

import { Badge } from "@/shared/components/shadcn/badge";
import { useAppTranslation } from "@/shared/hooks";

interface Props {
    stock: number
}

export function BookHeaderActions({ stock }: Props) {
    const { t } = useAppTranslation("books");
    const isInStock = stock > 0;
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                {isInStock ? (
                    <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20 px-3 py-1 flex gap-1.5 items-center rounded-lg border shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="font-bold text-xs">
                            {t("details.inStock")}
                        </span>
                    </Badge>
                ) : (
                    <Badge variant="destructive" className="px-3 py-1 flex gap-1.5 items-center rounded-lg shadow-sm">
                        <XCircle className="w-3.5 h-3.5" />
                        <span className="font-bold text-xs">{t("details.outOfStock")}</span>
                    </Badge>
                )}
            </div>

            <div className="flex gap-2 shrink-0">
                <button className="p-2 cursor-pointer rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-slate-400" title={t("details.share")}>
                    <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 cursor-pointer rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-slate-400 hover:text-red-500" title={t("details.addToWishlist")}>
                    <Heart className="w-5 h-5" />
                </button>
            </div>
        </div>

    );
};