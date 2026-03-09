"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import style from "./../styles/book-gallery-section.module.css";
import { cn } from "@/lib/utils";

interface BookGalleryProps {
    coverImage: string | null;
    images?: { image_url: string; display_order: number }[];
}

export const BookGallerySection = ({ coverImage, images = [] }: BookGalleryProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    // ترتيب الصور: الغلاف أولاً، ثم باقي الصور بدون تكرار الغلاف لو موجود في الـ Array
    const allImages = [
        ...(coverImage ? [{ image_url: coverImage, display_order: -1 }] : []),
        ...images.filter(img => img.image_url !== coverImage) // منع التكرار
            .sort((a, b) => a.display_order - b.display_order),
    ];

    if (allImages.length === 0) return null;

    return (
        <div className={cn("flex flex-col gap-6 w-full max-w-[500px] mx-auto", style["book-gallery"])}>

            {/* 1. Main Display */}
            <div className="relative group overflow-hidden rounded-[1.5rem] bg-slate-50 dark:bg-zinc-900 border bg-slate-50/95 dark:border-zinc-800 shadow-xl">
                <Swiper
                    spaceBetween={0}
                    effect={"fade"}
                    navigation={true}
                    fadeEffect={{ crossFade: true }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs, EffectFade]}
                    className="aspect-[0.9] w-full"
                >
                    {allImages.map((img, index) => (
                        <SwiperSlide key={`main-${index}`} className="flex items-center justify-center bg-slate-50/95 dark:bg-zinc-950">
                            <div className="relative h-full w-full p-6 md:p-10">
                                <Image
                                    src={img.image_url}
                                    alt="Book view"
                                    fill
                                    className="object-contain !p-[inherit]"
                                    priority={index === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* 2. Thumbs Swiper */}
            {allImages.length > 1 && (
                <div className="px-2">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="h-20"
                    >
                        {allImages.map((img, index) => (
                            <SwiperSlide
                                key={`thumb-${index}`}
                                className="relative cursor-pointer rounded-lg overflow-hidden border-2 border-transparent transition-all opacity-40 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-blue-600 shadow-sm"
                            >
                                <Image
                                    src={img.image_url}
                                    alt={`Thumb ${index}`}
                                    fill
                                    className="object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};