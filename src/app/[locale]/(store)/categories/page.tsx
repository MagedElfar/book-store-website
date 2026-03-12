
import { Metadata } from "next";

import { getCategories } from "@/features/categories/api/get";
import { ListCategoryCard } from "@/features/categories/components/ListCategoryCard";
import { EmptyState } from "@/shared/components/common/EmptyState";
import { Pagination } from "@/shared/components/filter/Pagination";
import { SearchFilter } from "@/shared/components/filter/SearchFilter";
import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeader } from "@/shared/components/layout/SectionHeader";
import { API_SPECIFICATION_LIMIT } from "@/shared/config/constants";
import { getAppTranslation } from "@/shared/lib/getTranslations";
import { calcTotalPages } from "@/shared/utils/helper";


interface Props {
    searchParams: Promise<Record<string, string>>
}

export async function generateMetadata(): Promise<Metadata> {

    const { t, lang } = await getAppTranslation("categories");

    return {
        title: t("categories"),
        description: t("title.catDesc"),
        openGraph: {
            title: t("title.categories"),
            description: t("title.catDesc"),
            type: "website",
            locale: lang,
        }
    };
}

export default async function CategoriesPage({ searchParams }: Props) {
    const { t, lang } = await getAppTranslation("categories");

    const params = await searchParams;
    const searchQuery = (params.search as string) || "";
    const limit = API_SPECIFICATION_LIMIT
    const currentPage = Number(params.page) || 1;

    const categories = await getCategories({
        limit,
        page: currentPage,
        lang,
        sortBy: "alpha",
        ...(searchQuery && {
            search: searchQuery
        })
    })

    const totalPages = calcTotalPages(categories.total || 0, limit)

    return (
        <PageLayout>
            {/* 1. Header Section */}
            <SectionHeader
                title={t("title.categories")}
                description={t("title.catDesc")}
            />


            <div className="grid  gap-10 lg:gap-12">
                <div>
                    <SearchFilter key={searchQuery} />
                </div>
                <div>
                    {categories.items?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 md:gap-8 lg:gap-10 px-2 sm:px-0">
                            {categories.items.map((category) => (
                                <ListCategoryCard key={category.id} category={category} />
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
