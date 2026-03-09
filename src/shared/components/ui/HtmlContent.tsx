"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HtmlContentProps {
    html: string | null | undefined;
    className?: string;
}

export const HtmlContent = ({ html, className }: HtmlContentProps) => {
    const [sanitized, setSanitized] = useState<string>("");

    useEffect(() => {
        if (html) {
            setSanitized(DOMPurify.sanitize(html));
        }
    }, [html]);

    if (!html) return null;

    return (
        <div
            className={cn(
                "prose prose-slate dark:prose-invert max-w-none",
                "text-slate-500 dark:text-zinc-400 text-[0.875rem] leading-[1.7]",

                "break-words",

                "prose-p:mb-[1.5em] prose-p:whitespace-pre-wrap prose-p:leading-[1.7]",

                "prose-ul:ltr:ml-6 prose-ul:rtl:mr-6 prose-ol:ltr:ml-6 prose-ol:rtl:mr-6",
                "prose-ul:mb-8 prose-li:mb-2",

                "prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline hover:prose-a:text-blue-800",

                "prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg prose-img:my-4",

                "prose-table:w-full prose-table:border-collapse prose-table:mb-8",
                "prose-th:border prose-th:border-slate-200 dark:prose-th:border-zinc-800 prose-th:p-2",
                "prose-td:border prose-td:border-slate-200 dark:prose-td:border-zinc-800 prose-td:p-2",

                className
            )}
            dangerouslySetInnerHTML={{ __html: sanitized || "" }}
        />
    );
};