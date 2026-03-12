"use client";

import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


import { BannerItem } from "@/features/banners/components/BannerItem";
import { Banner } from "@/features/banners/types/banner";

import styles from "./../styles/hero.module.css";

interface HeroSectionProps {
    banners: Banner[];
}

export const HeroSection = ({ banners }: HeroSectionProps) => {
    if (!banners || banners.length === 0) return null;

    return (
        <section className="relative w-full overflow-hidden">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
                speed={1200}
                loop={banners.length > 1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                className={styles.heroContainer}
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={banner.id}>
                        <div className="w-full aspect-[16/9] md:aspect-[21/8] lg:aspect-[21/7]">
                            <BannerItem banner={banner} priority={index === 0} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};