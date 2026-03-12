// src/shared/components/PageTitle.tsx

"use client";

import { cn } from "@/shared/lib/utils";

interface PageTitleProps {
    title?: string;
    description?: string;
    nested?: boolean;
    actions?: React.ReactNode;
    className?: string;
}

export function PageTitle({
    title,
    description,
    nested,
    actions,
    className,
}: PageTitleProps) {

    return (
        <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)}>
            <div className="flex items-start gap-3">
                <div className="space-y-1">
                    {title && (
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {actions && (
                <div className="flex items-center gap-2 self-end md:self-center">
                    {actions}
                </div>
            )}
        </div>
    );
}