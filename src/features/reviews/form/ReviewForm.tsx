import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { FormTextAreaField } from '@/shared/form/components/inputs/FormTextAreaField';
import { StarRatingField } from '@/shared/form/components/inputs/StarRatingField';
import { FormContainer } from '@/shared/form/components/layout/FormContainer';
import { AppFormProvider } from '@/shared/form/providers/AppFormProvider';
import { useAppTranslation } from '@/shared/hooks/use-translation';
import { errorMapper } from '@/shared/utils/error';

import { useCreateReview } from '../hooks/useCreateReview';
import { useUpdateReview } from '../hooks/useUpdateReview';
import { ReviewFormSchema, type ReviewFormSchemaType } from '../schema/ReviewFormSchema';
import { Review } from '../types/review';

interface ReviewFormProps {
    bookId: string;
    existingReview?: Review | null; // If provided, form enters "Edit Mode"
    onSuccess?: () => void;
}

export function ReviewForm({ bookId, existingReview, onSuccess }: ReviewFormProps) {
    const { t } = useAppTranslation("reviews");
    const { user } = useAuthState();

    const { mutateAsync: createReview } = useCreateReview(bookId);
    const { mutateAsync: updateReview } = useUpdateReview(bookId);

    const isEditMode = !!existingReview;

    const defaultValues: Partial<ReviewFormSchemaType> = {
        rating: existingReview?.rating || 0,
        comment: existingReview?.comment || "",
        book_id: bookId,
        user_id: user?.id
    };

    const methods = useForm<ReviewFormSchemaType>({
        resolver: zodResolver(ReviewFormSchema(t)),
        defaultValues
    });

    const { reset } = methods;

    // Reset form when existingReview changes (e.g., after initial fetch)
    useEffect(() => {
        if (existingReview) {
            reset({
                rating: existingReview.rating,
                comment: existingReview.comment,
                book_id: bookId,
                user_id: user?.id
            });
        }
    }, [existingReview, reset, bookId, user?.id]);

    const onSubmit = async (data: ReviewFormSchemaType) => {
        try {
            if (isEditMode && existingReview) {
                await updateReview({
                    reviewId: existingReview.id,
                    data: { rating: data.rating, comment: data.comment }
                });
                toast.success(t("reviews.success_update"));
            } else {
                await createReview({
                    ...data,
                    book_id: bookId,
                    user_id: user!.id
                });
                toast.success(t("reviews.success_add"));
            }

            if (!isEditMode) reset(); // Clear form only if it's a new review
            onSuccess?.();
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <AppFormProvider<ReviewFormSchemaType> methods={methods} onSubmit={onSubmit}>
            <FormContainer
                contentClassName='items-center gap-6 md:gap-6'
            >
                <h3 className="font-bold text-lg">
                    {isEditMode ? t("reviews.edit_review") : t("reviews.add_review")}
                </h3>

                {/* Star Rating Selection Component */}
                <div className="py-2">
                    <label className="block text-center text-sm font-medium mb-2">{t("reviews.rating_label")}</label>
                    <StarRatingField name="rating" />
                </div>

                {/* Comment Textarea */}
                <FormTextAreaField
                    name="comment"
                    label={t("reviews.comment_label")}
                    placeholder={t("reviews.placeholder")}
                    rows={4}
                />
            </FormContainer>
        </AppFormProvider>
    );
}