import { Metadata } from "next";
import { Suspense } from "react";

import { getBooKsApi } from "@/features/books/api/get";
import { BookListSection } from "@/features/books/sections/BookListSection";
import { mapQuerySearchParamsToBookSearchParams } from "@/features/books/utils/mapper";
import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeader } from "@/shared/components/layout/SectionHeader";
import { BookListSectionSkeleton } from "@/shared/components/loading/BookListSectionSkeleton";
import { getAppTranslation } from "@/shared/lib/getTranslations";
import { calcTotalPages } from "@/shared/utils/helper";

export const dynamic = 'force-dynamic';

interface Props {
    searchParams: Promise<Record<string, string>>,
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const { t } = await getAppTranslation(locale, "books");

    return {
        title: `${t("books")}`,
        description: t("title.booksDesc"),
        alternates: {
            canonical: "/books",
        },
        openGraph: {
            title: t("title.books"),
            description: t("title.booksDesc"),
            type: "website",
        }
    };
}

export default async function BooksPage({ searchParams, params: pParams }: Props) {
    const { locale } = await pParams
    const { t } = await getAppTranslation(locale, "books");

    const params = await searchParams;
    const currentPage = Number(params.page) || 1;

    const bookParams = mapQuerySearchParamsToBookSearchParams(params)

    const books = await getBooKsApi(bookParams);

    const totalPages = calcTotalPages(books.total || 0, bookParams.limit)

    return (
        <PageLayout>
            {/* 1. Header Section */}
            <SectionHeader
                title={t("title.books")}
                description={t("title.booksDesc")}
            />
            <BookListSection
                books={books}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </PageLayout>
    );
}
