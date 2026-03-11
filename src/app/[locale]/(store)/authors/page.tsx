
import { Metadata } from "next";

import { AuthorCard, getAuthors } from "@/features/authors";
import { EmptyState, PageLayout, Pagination, SearchFilter, SectionHeader } from "@/shared/components";
import { API_SPECIFICATION_LIMIT } from "@/shared/config";
import { getAppTranslation } from "@/shared/lib";
import { calcTotalPages } from "@/shared/utils";

interface Props {
    searchParams: Promise<Record<string, string>>
}

export async function generateMetadata(): Promise<Metadata> {
    const { t, lang } = await getAppTranslation("authors");

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

export default async function AuthorPage({ searchParams }: Props) {
    const { t, lang } = await getAppTranslation("authors");

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
            {/* 1. Header Section */}
            <SectionHeader
                title={t("title.authors")}
                description={t("title.authDesc")}
            />


            <div className="grid  gap-10 lg:gap-12">
                <div>
                    <SearchFilter key={searchQuery} />
                </div>
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
                <div >
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </PageLayout>
    );
}
