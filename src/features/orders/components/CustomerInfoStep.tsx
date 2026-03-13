"use client";

import { FormPhoneInput } from "@/shared/form/components/inputs/FormPhoneInput";
import { FormTextField } from "@/shared/form/components/inputs/FormTextField";
import { useAppTranslation } from "@/shared/hooks/use-translation";

export function CustomerInfoStep() {
    const { t } = useAppTranslation("order");

    return (
        <section className="space-y-6" >
            <div className="flex items-center gap-4">
                <h3 className="text-lg font-bold min-w-max text-primary">
                    {t("fields.customerInfo")}
                </h3>
                <div className="h-[1px] w-full bg-slate-200 dark:bg-zinc-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormTextField
                    required
                    name="customer_name"
                    label={t("fields.customer_name")}
                />
                <FormPhoneInput
                    name="customer_phone"
                    label={t("fields.customer_phone")}
                />
                <FormTextField
                    required
                    name="customer_email"
                    label={t("fields.customer_email")}
                />
            </div>
        </section>

    );
}