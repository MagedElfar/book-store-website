"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAppTranslation } from "@/shared/hooks";
import { Link } from "@/i18n/routing";
import { paths } from "@/shared/config";

export const SpecialPromoSection = () => {
    const { t } = useAppTranslation("home");

    return (
        <section className="relative w-full h-[450px] md:h-[550px] overflow-hidden group">

            {/* 1. Background Image */}
            <Image
                src="/banners/book-promo.jpg"
                alt="Promo Background"
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

            {/* Content Container */}
            <div className="container mx-auto px-4 relative h-full flex items-center justify-center">
                <div className="max-w-4xl text-white flex flex-col items-center text-center space-y-5 z-10">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm border border-white/20 text-xs md:text-sm font-bold uppercase tracking-widest">
                        <Sparkles size={14} className="text-yellow-300" />
                        <span>{t("promo.badge")}</span>
                    </div>

                    {/* Headline Changed to H1 and resized */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.2] tracking-tight">
                        {t("promo.title_part1")}{" "}
                        <span className="text-yellow-400 drop-shadow-md">
                            {t("promo.discount")}
                        </span>{" "}
                    </h1>

                    {/* Description - Slighly smaller for better hierarchy */}
                    <p className="text-gray-100 text-base md:text-xl opacity-90 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
                        {t("promo.description")}
                    </p>

                    {/* Button */}
                    <div className="pt-4">
                        <Link
                            href={paths.offers}
                            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-blue-900 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-yellow-400 hover:scale-105 active:scale-95 shadow-xl group/btn"
                        >
                            {t("promo.button")}
                            <ArrowRight
                                size={20}
                                className="transition-transform duration-300 group-hover/btn:translate-x-1.5 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1.5"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white dark:from-[#09090b] to-transparent pointer-events-none" />
        </section>
    );
};