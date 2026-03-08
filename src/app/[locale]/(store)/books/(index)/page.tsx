import { BookCard, getBooKsApi } from "@/features/books";
import { prefetchInfiniteCategory } from "@/features/categories";
import { GlobalLoadingIndicator, Pagination, SectionHeader, SortingFilter } from "@/shared/components";
import { BookFilters } from "@/shared/components";
import { getAppTranslation } from "@/shared/lib";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ensureArray = (value: any) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return value.split(","); // لو كانت String مفصول بفاصلة أو قيمة واحدة
};

export default async function BooksPage({ searchParams }: { searchParams: any }) {
    const { t } = await getAppTranslation("books");
    // await delay(3000);

    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const limit = 12;

    const formattedParams = {
        ...params,
        category_ids: ensureArray(params.category_ids),
        author_ids: ensureArray(params.author_ids),
        tagIds: ensureArray(params.tagIds),
        page: Number(params.page) || 1,
        minPrice: params.min_price ? Number(params.min_price) : undefined,
        maxPrice: params.max_price ? Number(params.max_price) : undefined,
        limit
    };

    const books = await getBooKsApi(formattedParams);

    const totalPages = Math.ceil((books.total || 0) / limit);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4">

                {/* 1. Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 main-sec-space">

                    <SectionHeader
                        title={t("title.books")}
                        description={t("title.booksDesc")}
                    />

                    <SortingFilter />
                </header>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* 2. Sidebar Filter Placeholder */}
                    <BookFilters />

                    {/* 3. Main Content (Books Grid Placeholder) */}
                    <main className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {books.items?.map((b) => (
                                <BookCard book={b} key={b.id} />
                            ))}
                        </div>

                        <div className="mt-12">
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
