"use client";

import { ErrorFallback } from "@/shared/components/feedback/ErrorFallback";

export default function GlobalErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="container mx-auto py-20">
            <ErrorFallback error={error} reset={reset} />
        </div>
    );
}