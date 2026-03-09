"use client"

import { useAppTranslation } from "@/shared/hooks"
import { formatPrice } from "@/shared/utils"
import { Star } from "lucide-react"

interface Props {
    rating: number,
    totalReviews: number,
    sale_price?: number | null
    price: number
}

export function BookDetails({
    rating,
    totalReviews,
    sale_price,
    price
}: Props) {
    const { t, lang } = useAppTranslation("books")
    return (<>

        {/*Rating */}
        <div className="flex items-center gap-4">
            <div className="flex items-center bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-lg border border-amber-100 dark:border-amber-900/30">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500 mr-1 rtl:ml-1 rtl:mr-0" />
                <span className="font-bold text-amber-700 dark:text-amber-500">
                    {rating || "0.0"}
                </span>
            </div>
            <span className="text-sm text-slate-400 border-l dark:border-zinc-800 pl-4 rtl:border-r rtl:border-l-0 rtl:pl-0 rtl:pr-4">
                ({totalReviews || 0} {t("details.reviews")})
            </span>
        </div>

        <hr className="border-slate-100 dark:border-zinc-800" />

        {/*Price Section */}
        <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {formatPrice(sale_price || price, lang)}
                </span>
                {sale_price && (
                    <span className="text-xl text-slate-400 line-through decoration-red-500/40">
                        {formatPrice(price, lang)}
                    </span>
                )}
            </div>
        </div>

    </>)
}