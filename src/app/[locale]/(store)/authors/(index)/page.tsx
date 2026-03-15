import { Metadata } from "next";
import { Suspense } from "react"; // 1. أضفنا الـ Suspense

import { getAuthors } from "@/features/authors/api/get";
import { AuthorCard } from "@/features/authors/components/AuthorCard";
import { EmptyState } from "@/shared/components/common/EmptyState";
import { Pagination } from "@/shared/components/filter/Pagination";
import { SearchFilter } from "@/shared/components/filter/SearchFilter";
import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeader } from "@/shared/components/layout/SectionHeader";
import { API_SPECIFICATION_LIMIT } from "@/shared/config/constants";
import { getAppTranslation } from "@/shared/lib/getTranslations";
import { calcTotalPages } from "@/shared/utils/helper";

export const dynamic = 'force-dynamic';

interface Props {
    searchParams: Promise<Record<string, string>>,
    params: Promise<{ locale: string }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const { t, lang } = await getAppTranslation(locale, "authors");

    return {
        title: t("authors"),
        description: t("title.authDesc"),
        openGraph: {
            title: t("title.authors"),
            description: t("title.authDesc"),
            type: "website",
            locale: lang,
        },
        twitter: {
            card: "summary",
            title: t("title.authors"),
            description: t("title.authDesc"),
        }
    };
}

export default async function AuthorPage({ searchParams, params: pParams }: Props) {
    const { locale } = await pParams
    const { t, lang } = await getAppTranslation(locale, "authors");

    const params = await searchParams;
    const searchQuery = (params.search as string) || "";
    const limit = API_SPECIFICATION_LIMIT
    const currentPage = Number(params.page) || 1;

    const authors = await getAuthors({
        limit,
        page: currentPage,
        lang,
        sortBy: "alpha",
        ...(searchQuery && {
            search: searchQuery
        })
    })

    const totalPages = calcTotalPages(authors.total || 0, limit)

    return (
        <PageLayout>
            <SectionHeader
                title={t("title.authors")}
                description={t("title.authDesc")}
            />

            <div className="grid gap-10 lg:gap-12">

                <Suspense fallback={<div className="h-10 w-full animate-pulse bg-gray-100 rounded-md" />}>
                    <div>
                        <SearchFilter key={searchQuery} />
                    </div>
                </Suspense>

                <div>
                    {authors.items?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 md:gap-8 lg:gap-10 px-2 sm:px-0">
                            {authors.items.map((author) => (
                                <AuthorCard key={author.id} author={author} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState />
                    )}
                </div>

                <Suspense fallback={<div className="h-10 w-full animate-pulse bg-gray-100 rounded-md" />}>
                    <div>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                        />
                    </div>
                </Suspense>
            </div>
        </PageLayout>
    );
}