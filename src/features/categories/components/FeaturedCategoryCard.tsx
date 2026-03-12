"use client";

import Image from "next/image";

import { Link } from "@/i18n/routing";
import { paths } from "@/shared/config/paths";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { Category } from "../types/category";



interface CategoryCardProps {
    category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
    const { getLocalizedValue } = useAppTranslation();
    const name = getLocalizedValue(category, "name");

    return (
        <Link
            href={paths.categories.details(category.slug)}
            className="group flex flex-col items-center gap-2 md:gap-4 transition-transform duration-300 w-full overflow-hidden"
            title={name}
        >
            {/* Image Wrapper */}
            <div className="relative w-full aspect-square max-w-[90px] sm:max-w-[110px] md:max-w-[125px]
                            rounded-full overflow-hidden border-2 border-transparent 
                            bg-gray-100 dark:bg-zinc-900 
                            transition-all duration-500
                            group-hover:translate-y-[-4px] group-hover:border-blue-600 
                            group-hover:shadow-lg">

                <Image
                    src={category?.image_url || "/images/img-ph.jpg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 90px, (max-width: 1024px) 110px, 125px"
                />
            </div>

            {/* Category Name */}
            <span className="text-[10px] xs:text-xs md:text-sm font-bold text-center 
                             text-gray-700 dark:text-zinc-200 
                             line-clamp-1 w-full px-1">
                {name}
            </span>
        </Link>
    );
};