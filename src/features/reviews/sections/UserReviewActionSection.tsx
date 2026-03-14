"use client";

import { Edit3, Trash2, X, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { DataHandler } from "@/shared/components/feedback/DataHandler";
import { Button } from "@/shared/components/shadcn/button";
import { Skeleton } from "@/shared/components/shadcn/skeleton";
import { paths } from "@/shared/config/paths";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { ReviewCard } from "../components/ReviewCard";
import { ReviewForm } from "../form/ReviewForm";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { useGetUserReview } from "../hooks/useGetUserReview";

interface UserReviewActionSectionProps {
    bookId: string;
}

export function UserReviewActionSection({ bookId }: UserReviewActionSectionProps) {
    const { t } = useAppTranslation("reviews");
    const router = useRouter();
    const { isAuthenticated, isLoading: isAuthLoading } = useAuthState();
    const [isEditing, setIsEditing] = useState(false);

    const { data: userReview, isLoading: isReviewLoading, isError, refetch } = useGetUserReview(bookId);
    const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview(bookId);

    if (isAuthLoading) return <UserReviewSkeleton />;

    if (!isAuthenticated) return <LoginRequiredPlaceholder t={t} router={router} />;

    return (
        <section className="bg-slate-50/50 dark:bg-zinc-900/20 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800">
            <DataHandler
                isLoading={isReviewLoading}
                isError={isError}
                onRetry={refetch}
                data={userReview || "no-review"}
                loadingComponent={<UserReviewSkeleton className="border-none p-0 bg-transparent" />}
            >
                {() => (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-zinc-100">
                                {userReview && !isEditing
                                    ? t("reviews.your_review")
                                    : (isEditing ? t("reviews.edit_review") : t("reviews.add_review"))}
                            </h3>

                            {userReview && !isEditing && (
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="h-8 text-blue-600">
                                        <Edit3 className="h-4 w-4 mr-1.5" />
                                        {t("reviews.edit")}
                                    </Button>
                                    <Button variant="ghost" size="sm" disabled={isDeleting} onClick={() => deleteReview(userReview.id)} className="h-8 text-destructive">
                                        <Trash2 className="h-4 w-4 mr-1.5" />
                                        {t("reviews.delete")}
                                    </Button>
                                </div>
                            )}

                            {isEditing && (
                                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="h-8 text-slate-500">
                                    <X className="h-4 w-4 mr-1.5" />
                                    {t("reviews.cancel_edit")}
                                </Button>
                            )}
                        </div>

                        {userReview && !isEditing ? (
                            <ReviewCard review={userReview} />
                        ) : (
                            <ReviewForm
                                bookId={bookId}
                                existingReview={isEditing ? userReview : null}
                                onSuccess={() => setIsEditing(false)}
                            />
                        )}
                    </div>
                )}
            </DataHandler>
        </section>
    );
}


function UserReviewSkeleton({ className }: { className?: string }) {
    return (
        <section className={`bg-slate-50/50 dark:bg-zinc-900/20 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 space-y-4 ${className}`}>
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-20" />
            </div>
            <div className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </section>
    );
}

function LoginRequiredPlaceholder({ t, router }: any) {
    return (
        <section className="bg-slate-50/50 dark:bg-zinc-900/20 p-8 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 text-center">
            <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-white dark:bg-zinc-800 rounded-full shadow-sm">
                    <Lock className="h-6 w-6 text-slate-400" />
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-lg">{t("reviews.login_required_title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("reviews.login_required_description")}</p>
                </div>
                <Button onClick={() => router.push(paths.auth.login)} className="mt-2 rounded-full px-8">
                    {t("reviews.login")}
                </Button>
            </div>
        </section>
    );
}