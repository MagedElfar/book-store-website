
import { ListCategoryCard, getCategories } from "@/features/categories";
import { EmptyState, PageLayout, Pagination, SearchFilter, SectionHeader } from "@/shared/components";
import { API_SPECIFICATION_LIMIT } from "@/shared/config";
import { getAppTranslation } from "@/shared/lib";
import { calcTotalPages } from "@/shared/utils";

interface Props {
    searchParams: Promise<Record<string, string>>
}

export default async function CategoriesPage({ searchParams }: Props) {
    const { t } = await getAppTranslation("categories");

    const params = await searchParams;
    const searchQuery = (params.search as string) || "";
    const limit = API_SPECIFICATION_LIMIT
    const currentPage = Number(params.page) || 1;

    const categories = await getCategories({
        limit,
        page: currentPage,
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


            <div className="grid  gap-10 lg:gap-16">
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
