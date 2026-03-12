"use client";

import { AlertCircle } from "lucide-react";

import { useRouter } from "@/i18n/routing";
import { cn } from "@/shared/lib/utils";

import { Button } from "../shadcn/button";
import { Card, CardContent } from "../shadcn/card";

interface Props {
    title: string;
    content: string;
    btnText: string;
    redirectPath?: string;
    rest?: () => void;
    className?: string;
}

export function ErrorRedirect({ title, content, btnText, redirectPath, rest, className }: Props) {
    const router = useRouter();

    const handleRedirect = () => {
        if (redirectPath) {
            router.push(redirectPath);
            return;
        }
        rest?.();
    };

    return (
        <div className={cn(
            "flex items-center justify-center w-full min-h-[400px] p-4",
            className
        )}>
            <Card className="max-w-[420px] w-full border-none shadow-none bg-transparent md:bg-white md:dark:bg-zinc-900 md:shadow-sm md:border md:border-zinc-200 md:dark:border-zinc-800">
                <CardContent className="pt-6 flex flex-col items-center text-center space-y-6">

                    {/* Icon Container */}
                    <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center animate-pulse">
                        <AlertCircle className="w-10 h-10 text-destructive" />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            {title}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-pre-line leading-relaxed">
                            {content}
                        </p>
                    </div>

                    {/* Action Button */}
                    <Button
                        variant="destructive"
                        className="w-full h-11 rounded-xl font-semibold shadow-lg shadow-destructive/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        onClick={handleRedirect}
                    >
                        {btnText}
                    </Button>

                </CardContent>
            </Card>
        </div>
    );
}