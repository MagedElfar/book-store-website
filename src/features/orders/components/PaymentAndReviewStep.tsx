"use client";

import { FormRadioGroup } from "@/shared/form/components/inputs/FormRadioGroup";
import { FormTextAreaField } from "@/shared/form/components/inputs/FormTextAreaField";
import { useAppTranslation } from "@/shared/hooks/use-translation";


export function PaymentAndReviewStep() {
    const { t } = useAppTranslation("order");

    return (
        <>
            <section className="space-y-6" >
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold min-w-max text-primary">
                        {t("fields.payment_method")}
                    </h3>
                    <div className="h-[1px] w-full bg-slate-200 dark:bg-zinc-800" />
                </div>


                <FormRadioGroup
                    name="payment_method"
                    options={[
                        {
                            label: t("methods.cod"),
                            value: "cod",
                        },
                    ]}
                    className="grid grid-cols-1 gap-4"
                />
            </section>

            <section className="space-y-6" >
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold min-w-max text-primary">
                        {t("fields.orderNotes")}
                    </h3>
                    <div className="h-[1px] w-full bg-slate-200 dark:bg-zinc-800" />
                </div>


                <FormTextAreaField
                    name="notes"
                    placeholder={t("fields.orderNotes")}
                    rows={4}
                    className="bg-slate-50 dark:bg-zinc-900/50"
                />
            </section>
        </>
    );
}