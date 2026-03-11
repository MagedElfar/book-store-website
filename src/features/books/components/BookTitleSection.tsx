"use client"

import { Author } from "@/features/authors";
import { Category } from "@/features/categories";
import { Link } from "@/i18n/routing";
import { Badge } from "@/shared/components/shadcn/badge";
import { paths } from "@/shared/config";
import { useAppTranslation } from "@/shared/hooks";

interface Props {
    title: string,
    authors: Author[],
    categories: Category[]
}

export function BookTitleSection({ title, authors, categories }: Props) {
    const { t, getLocalizedValue } = useAppTranslation("books");
    return (
        <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.2] tracking-tight">
                {title}
            </h1>

            <div className="flex flex-col gap-3">
                {/* Authors - Text Only (No Boxes) */}
                {authors.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                            {t("details.authorBy")}
                        </span>
                        <div className="flex flex-wrap items-center">
                            {authors.map((author, index) => (
                                <div key={author.id} className="flex items-center">
                                    <Link
                                        href={paths.authors.details(author.slug)}
                                        className="text-[17px] font-bold text-blue-600 dark:text-blue-400 hover:underline transition-all"
                                    >
                                        {getLocalizedValue(author, "name")}
                                    </Link>
                                    {index < authors.length - 1 && (
                                        <span className="mx-2 text-slate-300 dark:text-zinc-700 font-light text-xl">/</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Categories - Pill Style */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <Link key={cat.id} href={paths.categories.details(cat.slug)}>
                                <Badge
                                    className="bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 border-none px-4 py-1.5 rounded-full font-semibold text-xs transition-all active:scale-95"
                                >
                                    {getLocalizedValue(cat, "name")}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};