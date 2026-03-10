"use client"

import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Book } from "@/features/books/types";
import { useAppTranslation } from "@/shared/hooks";
import { formatPrice } from "@/shared/utils";

interface BookCardProps {
    book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {

    const { getLocalizedValue, dir, lang } = useAppTranslation();
    const title = getLocalizedValue(book, "title");

    const hasSale = book.sale_price && book.sale_price < book.price;
    const discountPercentage = hasSale
        ? Math.round(((book.price - (book.sale_price || 0)) / book.price) * 100)
        : 0;

    const highlightedTags = book.tags?.filter(tag => tag.is_pained) || [];

    return (
        <div className="group relative flex flex-col w-full bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:shadow-zinc-950/50 transition-all duration-300 overflow-hidden">

            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-zinc-800">
                <Link href={`/books/${book.slug}`}>
                    <Image
                        src={book.cover_image || "/placeholder-book.png"}
                        alt={title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                </Link>

                {/* Overlay for Dark Mode Image brightness */}
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20 pointer-events-none" />

                {/* Sale Badge */}
                {hasSale && (
                    <div className={`absolute top-2 ${dir === 'rtl' ? 'right-2' : 'left-2'} bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg z-10 uppercase tracking-tighter`}>
                        {discountPercentage}% {lang === 'ar' ? 'خصم' : 'OFF'}
                    </div>
                )}

                {/* Floating Tags */}
                <div className={`absolute top-2 ${dir === "rtl" ? 'left-2' : 'right-2'} flex flex-col gap-1.5 z-10`}>
                    {highlightedTags.map(tag => (
                        <span
                            key={tag.id}
                            style={{ backgroundColor: tag.color || '#3b82f6' }}
                            className="text-white text-[9px] font-bold px-2 py-1 rounded-md shadow-md backdrop-blur-sm"
                        >
                            {getLocalizedValue(tag, "name")}
                        </span>
                    ))}
                </div>
            </div>

            {/* Details Section */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Author */}
                {book.authors && book.authors.length > 0 && (
                    <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">
                        {getLocalizedValue(book.authors[0], "name")}
                    </span>
                )}

                {/* Title */}
                <Link href={`/books/${book.slug}`}>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-100 line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors h-10 leading-tight">
                        {title}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex items-center">
                        <Star className="fill-yellow-400 text-yellow-400" size={12} />
                        <span className="text-xs font-bold text-gray-700 dark:text-zinc-300 ml-1">
                            {book.average_rating}
                        </span>
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-zinc-500">
                        ({book.total_reviews} {lang === 'ar' ? 'مراجعة' : 'reviews'})
                    </span>
                </div>

                {/* Bottom Row: Price & Cart */}
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        {hasSale ? (
                            <>
                                <span className="text-blue-600 dark:text-blue-400 font-extrabold text-lg tracking-tight">
                                    {formatPrice(book.sale_price!, lang)}
                                </span>
                                <span className="text-gray-400 dark:text-zinc-500 line-through text-[11px] -mt-1 font-medium">
                                    {formatPrice(book.price, lang)}
                                </span>
                            </>
                        ) : (
                            <span className="text-gray-900 dark:text-zinc-100 font-extrabold text-lg tracking-tight">
                                {formatPrice(book.price, lang)}
                            </span>
                        )}
                    </div>

                    <button
                        className="flex items-center justify-center w-9 h-9 bg-gray-900 dark:bg-blue-600 text-white rounded-full hover:bg-blue-600 dark:hover:bg-blue-500 hover:scale-110 transition-all duration-300 shadow-lg shadow-gray-200 dark:shadow-none"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};