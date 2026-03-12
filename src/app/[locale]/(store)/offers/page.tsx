import { Metadata } from "next";

import { getBooKsApi } from "@/features/books/api/get";
import { BookListSection } from "@/features/books/sections/BookListSection";
import { mapQuerySearchParamsToBookSearchParams } from "@/features/books/utils/mapper";
import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeader } from "@/shared/components/layout/SectionHeader";
import { getAppTranslation } from "@/shared/lib/getTranslations";
import { calcTotalPages } from "@/shared/utils/helper";

interface Props {
    searchParams: Promise<Record<string, string>>
}

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getAppTranslation("common");

    return {
        title: t("offers.title"),
        description: t("offers.description"),
        openGraph: {
            title: t("offers.title"),
            description: t("offers.description"),
            type: "website",
        },
        alternates: {
            canonical: "/offers",
        }
    };
}

export default async function OffersPage({ searchParams }: Props) {
    const { t } = await getAppTranslation("common");

    const params = await searchParams;
    const currentPage = Number(params.page) || 1;

    const bookParams = mapQuerySearchParamsToBookSearchParams(params)

    const books = await getBooKsApi({
        ...bookParams,
        isOffers: true
    });

    const totalPages = calcTotalPages(books.total || 0, bookParams.limit)

    return (
        <PageLayout>
            <SectionHeader
                title={t("offers.title")}
                description={t("offers.description")}
            />

            <BookListSection
                books={books}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </PageLayout>
    );
}
