import { getBooKsApi } from "@/features/books";
import { prefetchInfiniteCategory } from "@/features/categories";
import { GlobalLoadingIndicator, SectionHeader } from "@/shared/components";
import { BookFilters } from "@/shared/components";
import { getAppTranslation } from "@/shared/lib";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export default async function BooksPage({ searchParams }: { searchParams: any }) {
    const { t } = await getAppTranslation("books");
    // await delay(3000);

    const params = await searchParams;
    const books = await getBooKsApi(params);
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4">

                {/* 1. Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 main-sec-space">

                    <SectionHeader
                        title={t("title.books")}
                        description={t("title.booksDesc")}
                    />

                    {/* Placeholder for Sorting/Layout Switcher */}
                    <div className="h-10 w-48 bg-slate-100 dark:bg-zinc-900 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
                        Sorting Placeholder
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* 2. Sidebar Filter Placeholder */}
                    <BookFilters />

                    {/* 3. Main Content (Books Grid Placeholder) */}
                    <main className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="aspect-[3/4] w-full bg-slate-50 dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 flex items-center justify-center animate-pulse"
                                >
                                    <span className="text-slate-300 dark:text-zinc-700 font-medium">Book Card {i}</span>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Placeholder */}
                        <div className="mt-12 h-12 w-64 mx-auto bg-slate-100 dark:bg-zinc-900 rounded-2xl animate-pulse" />
                    </main>

                </div>
            </div>
        </div>
    );
}
function getBooks(params: any) {
    throw new Error("Function not implemented.");
}

