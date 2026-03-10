"use client"

import Image from "next/image";

import { useAppTranslation } from '@/shared/hooks';

import { Category } from '../types'

interface Props {
    category: Category
}

export function CategoryHeader({ category }: Props) {


    const { getLocalizedValue } = useAppTranslation()

    const description = getLocalizedValue(category, "description")

    return <header className="relative mb-10">
        <div className="relative h-[200px] md:h-[300px] w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            {category.banner_url ? (
                <Image
                    src={category.banner_url || "/images/img-ph.jpg"}
                    alt={getLocalizedValue(category)}
                    fill
                    className="object-cover"
                    priority
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10" />
            )}
            <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container mx-auto px-6">
            <div className="relative -mt-16 md:-mt-20 flex flex-col items-center text-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-zinc-950 overflow-hidden shadow-xl bg-white dark:bg-zinc-900">
                    <Image
                        src={category.image_url || "/images/img-ph.jpg"}
                        alt={getLocalizedValue(category)}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="mt-6 max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
                        {getLocalizedValue(category)}
                    </h1>

                    {description && (
                        <p className="text-sm md:text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    </header>
}
