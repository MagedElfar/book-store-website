
import { Metadata } from "next";

import { CheckoutView } from "@/features/orders/views/CheckoutView";
import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeader } from "@/shared/components/layout/SectionHeader";
import { getAppTranslation } from "@/shared/lib/getTranslations";

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const { t } = await getAppTranslation(locale, "order");

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

export default async function CheckoutPage({ params }: Props) {
    const { locale } = await params

    const { t } = await getAppTranslation(locale, "order");

    return (
        <PageLayout>
            <SectionHeader
                title={t("checkout")}
            />

            <CheckoutView />
        </PageLayout>
    );
}
