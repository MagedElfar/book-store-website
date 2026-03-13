import { Metadata } from "next";

import { getBooKsApi } from "@/features/books/api/get";
import { BookListSection } from "@/features/books/sections/BookListSection";
import { mapQuerySearchParamsToBookSearchParams } from "@/features/books/utils/mapper";
import { CheckoutView } from "@/features/orders/views/CheckoutView";
import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeader } from "@/shared/components/layout/SectionHeader";
import { getAppTranslation } from "@/shared/lib/getTranslations";
import { calcTotalPages } from "@/shared/utils/helper";

export default async function CheckoutPage() {
    const { t } = await getAppTranslation("order");



    return (
        <PageLayout>
            <SectionHeader
                title={t("checkout")}
            />

            <CheckoutView />
        </PageLayout>
    );
}
