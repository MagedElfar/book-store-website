import { Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/shadcn/avatar";
import { Card, CardContent } from "@/shared/components/shadcn/card";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";
import { formatRelativeDate } from "@/shared/utils/date";

import { Review } from "../types/review";

interface ReviewCardProps {
    review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
    const { lang } = useAppTranslation("reviews");

    return (
        <Card className="border-none shadow-none bg-slate-50/50 dark:bg-zinc-900/50">
            <CardContent className="p-4">
                <div className="flex gap-4">
                    {/* User Avatar */}
                    <Avatar className="h-10 w-10 border border-slate-200 dark:border-zinc-800">
                        <AvatarImage src={review.user?.avatar_url || ""} alt={review.user?.full_name} />
                        <AvatarFallback className="bg-slate-100 dark:bg-zinc-800 text-slate-500 text-xs">
                            {review.user?.full_name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-zinc-100 truncate">
                                {review.user?.full_name}
                            </h4>
                            <span className="text-[10px] text-slate-400 dark:text-zinc-500 whitespace-nowrap">
                                {formatRelativeDate(review.created_at, lang)}
                            </span>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={12}
                                    className={cn(
                                        "transition-colors",
                                        star <= review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-slate-200 dark:text-zinc-800"
                                    )}
                                />
                            ))}
                        </div>

                        {/* Review Comment */}
                        {review.comment && (
                            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-normal mt-2 italic">
                                "{review.comment}"
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}