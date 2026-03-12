"use client";

import Image from "next/image";
import Link from "next/link";

import { paths } from "@/shared/config/paths";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { Category } from "../types/category";

interface CategoryCardProps {
    category: Category;
}

export const ListCategoryCard = ({ category }: CategoryCardProps) => {
    const { getLocalizedValue } = useAppTranslation();
    const name = getLocalizedValue(category, "name");

    return (
        <Link
            href={paths.categories.details(category.slug)}
            className="group flex flex-col w-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-500/30"
            title={name}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 dark:bg-zinc-800">
                <Image
                    src={category?.image_url || "/images/img-ph.jpg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Content Wrapper */}
            <div className="p-3 md:p-4 flex flex-col items-center justify-center bg-white dark:bg-zinc-900">
                <span className="text-sm md:text-base font-bold text-gray-800 dark:text-zinc-100 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 text-center">
                    {name}
                </span>
            </div>
        </Link>
    );
};