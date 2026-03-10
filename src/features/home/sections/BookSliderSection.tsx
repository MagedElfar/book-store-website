/* eslint-disable react-hooks/refs */
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { BookCard, type Book } from "@/features/books";
import { SectionTitle } from "@/shared/components";
import { useAppTranslation } from "@/shared/hooks";

import styles from "./../styles/book-slider.module.css";

interface BestSellersSectionProps {
    books: Book[];
    title: string;
}

export const BookSliderSection = ({ books, title }: BestSellersSectionProps) => {
    const [mounted, setMounted] = useState(false);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const { dir } = useAppTranslation()

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <section className={`${styles.section} dark:bg-[#09090b] main-sec-space `}>
            <div className="container mx-auto px-4">

                <div className="flex items-center justify-between mb-8">
                    <SectionTitle title={title} />

                    <div className="hidden md:flex items-center gap-2">
                        <button
                            ref={prevRef}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {dir === "rtl" ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                        <button
                            ref={nextRef}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {dir === "rtl" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                        </button>
                    </div>
                </div>

                <div className={styles.sliderContainer}>
                    {
                        mounted ?
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1.3}
                                onBeforeInit={(swiper) => {
                                    // @ts-expect-error - نربط الأسهم يدوياً قبل الـ Initialization
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    swiper.params.navigation.nextEl = nextRef.current;
                                }}
                                navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                }}
                                pagination={{
                                    clickable: true,
                                    el: `.${styles.pagination}`,
                                }}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 4 },
                                    1280: { slidesPerView: 5 },
                                }}
                                className="!overflow-visible"
                                autoplay={false}
                            >
                                {books.map((book) => (
                                    <SwiperSlide key={book.id} className={styles.swiperSlide}>
                                        <BookCard book={book} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            :
                            <div className="flex flex-nowrap gap-5 sm:overflow-hidden">
                                {books.slice(0, 8).map((book) => (
                                    <div
                                        key={book.id}
                                        className="shrink-0 w-[calc(100%/1.3-16px)] sm:w-[calc(100%/2.5-16px)] lg:w-[calc(100%/4-16px)] xl:w-[calc(100%/5-16px)]"
                                    >
                                        <BookCard book={book} />
                                    </div>
                                ))}
                            </div>
                    }

                    <div className={styles.pagination} />
                </div>
            </div>
        </section>
    );
};