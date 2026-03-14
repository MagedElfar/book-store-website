"use client";

import { ReviewsListSection } from "@/features/reviews/sections/ReviewsListSection";
import { UserReviewActionSection } from "@/features/reviews/sections/UserReviewActionSection";
import { Separator } from "@/shared/components/shadcn/separator";


interface BookReviewsSectionProps {
    bookId: string;
}

export function BookReviewsSection({ bookId }: BookReviewsSectionProps) {
    return (
        <div className="max-w-4xl space-y-6 mx-auto">
            <div className="space-y-6">
                <UserReviewActionSection bookId={bookId} />
            </div>

            <Separator />

            <div className="space-y-6">
                <ReviewsListSection bookId={bookId} />
            </div>
        </div>
    );
}