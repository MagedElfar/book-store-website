"use client"

import { TagIcon } from "lucide-react"

import { Tag } from "@/features/tags"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { HtmlContent } from "@/shared/components"
import { Badge } from "@/shared/components/shadcn/badge"
import { paths } from "@/shared/config"
import { useAppTranslation } from "@/shared/hooks"

interface Props {
  isbn?: string | null,
  publisher?: string | null
  published_year?: number | null
  pages?: number | null
  sku?: string | null
  description?: string
  tags: Tag[]
}

export default function BookSpecifications({
  isbn,
  publisher,
  published_year,
  pages,
  sku,
  description,
  tags
}: Props) {
  const { t, getLocalizedValue } = useAppTranslation("books");

  return <>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-2 py-5 border-y border-slate-100 dark:border-zinc-800 my-2">
      {isbn && <Specifications title={t("details.isbn")} state={isbn} />}
      {publisher && <Specifications title={t("details.publisher")} state={publisher} />}
      {published_year && <Specifications title={t("details.publishedYear")} state={published_year} />}
      {pages && <Specifications title={t("details.pages")} state={`${pages} ${t("details.pageUnit")}`} />}
      {sku && <Specifications title={t("details.sku")} state={sku} />}
    </div>

    {description && (
      <div className="py-2 prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-zinc-400">
        <HtmlContent html={description} />
      </div>
    )}

    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-50 dark:border-zinc-900/50">
        <TagIcon className="w-4 h-4 text-slate-400 mt-1" />
        {tags.map((tag) => (
          <Link key={tag.id} href={paths.books.filter(`tag_ids=${tag.id}`)}>
            <Badge
              variant="secondary"
              style={{ "--tag-bg": tag.color } as React.CSSProperties}
              className={cn(
                "bg-[color:var(--tag-bg)]",
                "text-white dark:text-white border-none font-bold px-3 py-1 rounded-full text-[11px]",
                "hover:brightness-110 shadow-sm transition-all active:scale-95",
                !tag.color && "bg-slate-500"
              )}
            >
              #{getLocalizedValue(tag, "name")}
            </Badge>
          </Link>
        ))}
      </div>
    )}
  </>
}

function Specifications({ title, state }: { title: string, state: string | number }) {
  return <div className="flex flex-col gap-1">
    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
      {title}
    </span>
    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300 tracking-wider tabular-nums">
      {state}
    </span>
  </div>
}