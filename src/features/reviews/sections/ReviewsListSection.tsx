"use client";

import { Loader2 } from "lucide-react";
import { useMemo } from "react";

import { DataHandler } from "@/shared/components/feedback/DataHandler";
import { Button } from "@/shared/components/shadcn/button";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { ReviewCard } from "../components/ReviewCard";
import { ReviewCardSkeleton } from "../components/ReviewCardSkeleton";
import { useGetBookReviews } from "../hooks/useGetBookReviews";
import { Review } from "../types/review";

interface ReviewsListSectionProps {
    bookId: string;
}

export function ReviewsListSection({ bookId }: ReviewsListSectionProps) {
    const { t } = useAppTranslation("reviews");

    const {
        data: reviewsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
        isError
    } = useGetBookReviews(bookId);

    // Flatten the infinite scroll pages into a single array
    const reviews = useMemo(() =>
        reviewsData?.pages.flatMap(p => p.items) || [],
        [reviewsData]
    );

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold border-b pb-4 mb-0">
                {t("reviews.title")}
            </h3>

            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={reviews}
                onRetry={refetch}
                isEmpty={reviews?.length === 0}
                loadingComponent={<ReviewCardSkeleton count={3} />}
                emptyComponent={
                    <p className="text-center text-muted-foreground py-10">
                        {t("reviews.no_reviews")}
                    </p>
                }
            >
                {(items: Review[]) => (
                    <div className="space-y-8">
                        <div className="space-y-6">
                            {items.map(review => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                />
                            ))}
                        </div>

                        {/* Load More Button */}
                        {hasNextPage && (
                            <div className="flex justify-center pb-10">
                                <Button
                                    variant="outline"
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="rounded-full px-8"
                                >
                                    {isFetchingNextPage ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t("reviews.loading")}
                                        </>
                                    ) : (
                                        t("reviews.loadMore")
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </DataHandler>
        </div>
    );
}