
import { Metadata } from "next";

import { CheckoutView } from "@/features/orders/views/CheckoutView";
import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeader } from "@/shared/components/layout/SectionHeader";
import { getAppTranslation } from "@/shared/lib/getTranslations";

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getAppTranslation("order");

    return {
        title: t("checkout"),
        description: t("summary.title"),
        robots: {
            index: false,
            follow: false,
        },
        openGraph: {
            title: t("checkout"),
            type: "website",
        },
    };
}

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
