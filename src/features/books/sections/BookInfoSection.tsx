"use client";

import { useAppTranslation } from "@/shared/hooks/use-translation";

import { BookActions } from "../components/BookActions";
import { BookDetails } from "../components/BookDetails";
import { BookFooter } from "../components/BookFooter";
import { BookHeaderActions } from "../components/BookHeaderActions";
import BookSpecifications from "../components/BookSpecifications";
import { BookTitleSection } from "../components/BookTitleSection";
import { Book } from "../types/book";

interface BookInfoSectionProps {
    book: Book;
}

export const BookInfoSection = ({ book }: BookInfoSectionProps) => {
    const { getLocalizedValue } = useAppTranslation("books");

    const title = getLocalizedValue(book, "title");
    const description = getLocalizedValue(book, "description");
    const authors = book.authors || [];
    const categories = book.categories || [];
    const tags = book.tags || [];


    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">

            <BookHeaderActions stock={book.stock} />

            <BookTitleSection title={title} authors={authors} categories={categories} />

            <BookDetails
                totalReviews={book.total_reviews}
                rating={book.average_rating}
                price={book.price}
                sale_price={book.sale_price}
            />

            <BookSpecifications
                sku={book?.sku}
                isbn={book?.isbn}
                published_year={book?.published_year}
                publisher={book?.publisher}
                pages={book?.pages}
                description={description}
                tags={tags}
            />

            <BookActions stock={book.stock} />

            <BookFooter />

        </div>
    );
};