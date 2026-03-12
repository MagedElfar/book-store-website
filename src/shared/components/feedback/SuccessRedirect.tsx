"use client";

import { CheckCircle2 } from "lucide-react";

import { useRouter } from "@/i18n/routing";
import { cn } from "@/shared/lib/utils";

import { Button } from "../shadcn/button";
import { Card, CardContent } from "../shadcn/card";

interface Props {
    title: string;
    content: string;
    btnText: string;
    redirectPath: string;
    className?: string;
}

export function SuccessRedirect({ title, content, btnText, redirectPath, className }: Props) {
    const router = useRouter();

    const handleRedirect = () => {
        router.push(redirectPath);
    };

    return (
        <div className={cn(
            "flex items-center justify-center w-full min-h-[400px] p-4",
            className
        )}>
            <Card className="max-w-[420px] w-full border-none shadow-none bg-transparent md:bg-white md:dark:bg-zinc-900 md:shadow-sm md:border md:border-zinc-200 md:dark:border-zinc-800">
                <CardContent className="pt-8 flex flex-col items-center text-center space-y-6">

                    {/* Success Icon with layered ring effect */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full scale-150 animate-ping duration-[2000ms]" />
                        <div className="relative w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            {title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                            {content}
                        </p>
                    </div>

                    {/* Action Button */}
                    <Button
                        className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        onClick={handleRedirect}
                    >
                        {btnText}
                    </Button>

                </CardContent>
            </Card>
        </div>
    );
}