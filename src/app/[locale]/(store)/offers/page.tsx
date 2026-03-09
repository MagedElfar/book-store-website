import { getBooKsApi, mapQuerySearchParamsToBookSearchParams } from "@/features/books";
import { BookListSection } from "@/features/books/components/BookListSection";
import { PageLayout, SectionHeader } from "@/shared/components";
import { getAppTranslation } from "@/shared/lib";
import { calcTotalPages } from "@/shared/utils";
import { Metadata } from "next";

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

export default async function OffersPage({ searchParams }: { searchParams: Record<string, string> }) {
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
