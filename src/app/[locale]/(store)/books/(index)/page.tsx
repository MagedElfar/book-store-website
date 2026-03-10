import { Metadata } from "next";

import { BookListSection, getBooKsApi, mapQuerySearchParamsToBookSearchParams } from "@/features/books";
import { PageLayout, SectionHeader } from "@/shared/components";
import { getAppTranslation } from "@/shared/lib";
import { calcTotalPages } from "@/shared/utils";

interface Props {
    searchParams: Promise<Record<string, string>>
}

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getAppTranslation("books");

    return {
        title: `${t("title.books")}`,
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

export default async function BooksPage({ searchParams }: Props) {
    const { t } = await getAppTranslation("books");

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
