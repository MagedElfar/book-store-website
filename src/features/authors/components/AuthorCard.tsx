"use client";

import Image from "next/image";
import Link from "next/link";
import { Category } from "@/features/categories/types";
import { paths } from "@/shared/config";
import { useAppTranslation } from "@/shared/hooks";
import { Author } from "../types";

interface AuthorCardProps {
    author: Author;
}

export const AuthorCard = ({ author }: AuthorCardProps) => {
    const { getLocalizedValue } = useAppTranslation();
    const name = getLocalizedValue(author, "name");

    return (
        <Link
            href={paths.authors.details(author.slug)}
            className="group flex flex-col items-center gap-4 transition-transform duration-300"
            title={name}
        >
            {/* Image Wrapper */}
            <div className="relative w-[100px] h-[100px] md:w-[125px] md:h-[125px] 
                            rounded-full overflow-hidden border-2 border-transparent 
                            bg-gray-100 dark:bg-zinc-900 
                            transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275)
                            group-hover:translate-y-[-8px] group-hover:border-blue-600 
                            group-hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.3)]">

                <Image
                    src={author?.image_url || "/images/img-ph.jpg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100px, 125px"
                />
            </div>

            {/* Category Name */}
            <span className="text-sm md:text-base font-bold text-center 
                             text-gray-700 dark:text-zinc-200 
                             transition-colors duration-300 
                             group-hover:text-blue-600 line-clamp-1 max-w-full px-2">
                {name}
            </span>
        </Link>
    );
};