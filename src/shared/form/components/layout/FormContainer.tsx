"use client";

import { useEffect, useRef, type ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/shadcn/button';
import { Card } from '@/shared/components/shadcn/card';
import { useAppTranslation } from '@/shared/hooks';

import { getAllErrorMessages, getFirstErrorPath } from '../../utilities';

interface Props {
    children: ReactNode;
    submitText?: string;
    className?: string;
    contentClassName?: string;
    buttonClassName?: string;
    isLoading?: boolean;
}

export function FormContainer({ children, submitText, contentClassName, className, buttonClassName, isLoading }: Props) {
    const { t } = useAppTranslation("common");
    const cardRef = useRef<HTMLDivElement>(null);

    const {
        formState: { isSubmitting, errors },
    } = useFormContext();

    const isUploading = Object.values(errors).some(err => err?.message === "uploading");
    const activeLoading = isLoading || isSubmitting;

    useEffect(() => {
        const firstErrorPath = getFirstErrorPath(errors)?.split('.')?.[0];

        getAllErrorMessages(errors).forEach((err, index) => {
            setTimeout(() => toast.error(err), index * 100);
        });

        if (firstErrorPath) {
            const fieldElement =
                document.querySelector(`[name="${firstErrorPath}"]`) ||
                document.querySelector(`[name="${firstErrorPath.replace('.', '\\.')}"]`) ||
                document.querySelector(`[data-test="${CSS.escape(firstErrorPath)}"]`);

            if (fieldElement) {
                fieldElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });

                // تأثير الهز (Shake) باستخدام Tailwind animation
                fieldElement.classList.add('animate-shake');

                setTimeout(() => {
                    (fieldElement as HTMLElement).focus?.();
                    fieldElement.classList.remove('animate-shake');
                }, 400);
            }
        }
    }, [errors]);

    return (
        <Card
            ref={cardRef}
            className={cn("p-4 sm:p-6 rounded-[2rem] border-zinc-200 dark:border-zinc-800", className)}
        >
            <div className={cn(
                "flex flex-col gap-6 md:gap-8",
                contentClassName
            )}>
                {children}

                <Button
                    type="submit"
                    disabled={activeLoading || isUploading}
                    className={cn(
                        "w-full sm:w-[250px] rounded-full h-12 font-bold text-lg transition-all active:scale-95",
                        buttonClassName
                    )}
                >
                    {activeLoading ? (
                        <div className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            {submitText || t("actions.submit")}
                        </div>
                    ) : (
                        submitText || t("actions.submit")
                    )}
                </Button>
            </div>
        </Card>
    );
}