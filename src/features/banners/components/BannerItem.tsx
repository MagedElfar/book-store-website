"use client";

import Image from "next/image";
import Link from "next/link";
import { Banner } from "../types";
import { useAppTranslation } from "@/shared/hooks";
import { cn } from "@/lib/utils";

interface BannerItemProps {
    banner: Banner;
    priority?: boolean;
}

export const BannerItem = ({ banner, priority = false }: BannerItemProps) => {
    const { getLocalizedValue } = useAppTranslation("common");

    const title = getLocalizedValue(banner, "title");
    const description = getLocalizedValue(banner, "description");
    const buttonText = getLocalizedValue(banner, "button_text");

    const getAlignmentProps = () => {
        const vertical = {
            top: "justify-start",
            middle: "justify-center",
            bottom: "justify-end",
        }[banner.vertical_pos || "middle"];

        const horizontal = {
            start: "items-start",
            center: "items-center",
            end: "items-end",
        }[banner.horizontal_pos || "center"];

        const textAlign = {
            start: "text-start",
            center: "text-center",
            end: "text-end",
        }[banner.horizontal_pos || "center"];

        return { vertical, horizontal, textAlign };
    };

    const align = getAlignmentProps();

    return (
        <div className="relative w-full h-full overflow-hidden group">
            {/* 1. الصورة الخلفية */}
            <Image
                src={banner.image_url}
                alt={title || "Promo Banner"}
                fill
                priority={priority}
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="100vw"
            />

            {/* 2. الـ Overlay */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    backgroundColor: `rgba(0, 0, 0, ${banner.overlay_opacity / 100})`,
                }}
            />

            {/* 3. حاوية المحتوى */}
            <div
                className={cn(
                    "absolute inset-0 z-10 p-6 md:p-12 lg:p-16 flex flex-col transition-all duration-500",
                    align.vertical,
                    align.horizontal,
                    align.textAlign
                )}
            >
                <div
                    className={cn(
                        "max-w-[95%] md:max-w-[80%] lg:max-w-[70%] flex flex-col space-y-3 md:space-y-5",
                        align.horizontal
                    )}
                >
                    {/* العنوان - تم تصغيره ليكون أنيقاً */}
                    {title && (
                        <h2
                            className="font-black leading-[1.2] tracking-tight transition-all duration-300 drop-shadow-md 
                                       text-lg md:text-2xl lg:text-3xl xl:text-4xl"
                            style={{ color: banner.text_color }}
                        >
                            {title}
                        </h2>
                    )}

                    {/* الوصف - أحجام صغيرة ومتناسقة */}
                    {description && (
                        <p
                            className="opacity-90 font-medium line-clamp-2 md:line-clamp-3 transition-all duration-300 
                                       text-xs md:text-sm lg:text-base xl:text-lg max-w-xl"
                            style={{ color: banner.text_color }}
                        >
                            {description}
                        </p>
                    )}

                    {/* الزر - تم تصغير البادينج والخط */}
                    {banner.link_url && buttonText && (
                        <div className="pt-2 md:pt-3">
                            <Link
                                href={banner.link_url}
                                className="inline-flex items-center justify-center 
                                           px-5 py-2 md:px-8 md:py-3 
                                           rounded-full font-bold transition-all 
                                           text-[10px] md:text-sm lg:text-base
                                           hover:scale-105 hover:brightness-110 active:scale-95 
                                           shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                                style={{
                                    backgroundColor: banner.btn_bg_color,
                                    color: banner.btn_color,
                                }}
                            >
                                {buttonText}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};