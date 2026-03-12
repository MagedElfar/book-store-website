"use client";

import { SearchX } from "lucide-react";

import { useRouter } from "@/i18n/routing";
import { cn } from "@/shared/lib/utils";

import { Button } from "../shadcn/button";

interface Props {
    title: string;
    content: string;
    btnText?: string;
    redirectPath?: string;
    onAction?: () => void;
    className?: string;
}

export function NoDataRedirect({
    title,
    content,
    btnText,
    redirectPath,
    onAction,
    className
}: Props) {
    const router = useRouter();

    const handleAction = () => {
        if (redirectPath) {
            router.push(redirectPath);
            return;
        }
        onAction?.();
    };

    return (
        <div className={cn(
            "flex flex-col items-center justify-center w-full min-h-[400px] p-8 text-center",
            className
        )}>
            {/* أيقونة الحالة الفارغة - خلفية دائرية خفيفة */}
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full scale-150 blur-sm opacity-50" />
                <div className="relative p-6 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-400 dark:text-zinc-500">
                    <SearchX size={64} strokeWidth={1.5} />
                </div>
            </div>

            {/* نصوص الحالة */}
            <div className="max-w-[320px] space-y-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                    {content}
                </p>
            </div>

            {btnText && (
                <Button
                    variant="outline"
                    onClick={handleAction}
                    className="mt-8 px-8 h-11 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                    {btnText}
                </Button>
            )}
        </div>
    );
}