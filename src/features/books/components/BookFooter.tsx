"use client"

import { Info } from 'lucide-react'

import { useAppTranslation } from '@/shared/hooks/use-translation'


export function BookFooter() {
    const { t } = useAppTranslation("books")
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-6 border-t border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-3 text-sm text-slate-500">
            <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20">
                <Info className="w-4 h-4 text-blue-500" />
            </div>
            <span>{t("details.shippingInfo")}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
            <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20">
                <Info className="w-4 h-4 text-blue-500" />
            </div>
            <span>{t("details.returnPolicy")}</span>
        </div>
    </div>
}
