import { BookFilters, EmptyState, MobileBookFilters } from "@/shared/components";
import { SortingFilter, Pagination } from "@/shared/components";
import { Book } from "../types";
import { BookCard } from "../components";

interface BookListSectionProps {
    books: {
        items: Book[];
        total: number;
    };
    currentPage: number;
    totalPages: number;
    hideCategories?: boolean;
    hideAuthors?: boolean;
}

export function BookListSection({
    books,
    currentPage,
    totalPages,
    hideCategories,
    hideAuthors
}: BookListSectionProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <BookFilters
                hideCategories={hideCategories}
                hideAuthors={hideAuthors}
            />

            <div className="flex-1">
                <div className="flex justify-between md:justify-end items-center mb-4">
                    <MobileBookFilters />
                    <SortingFilter />
                </div>

                {books.items?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {books.items.map((b) => (
                            <BookCard book={b} key={b.id} />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}

                <div className="mt-12">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};