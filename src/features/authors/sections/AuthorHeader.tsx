"use client"

import Image from "next/image";

import { useAppTranslation } from "@/shared/hooks/use-translation";

import { Author } from "../types/author";


interface Props {
    author: Author
}

export function AuthorHeader({ author }: Props) {
    const { getLocalizedValue } = useAppTranslation()

    const name = getLocalizedValue(author, "name");
    const bio = getLocalizedValue(author, "bio");

    return (
        <header className="relative mb-10">
            <div className="relative h-[180px] md:h-[250px] w-full overflow-hidden bg-gradient-to-r from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 shadow-inner">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
            </div>

            <div className="container mx-auto px-6">
                <div className="relative -mt-16 md:-mt-20 flex flex-col items-center text-center">

                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-zinc-950 overflow-hidden shadow-2xl bg-white dark:bg-zinc-900">
                        <Image
                            src={author.image_url || "/images/img-ph.jpg"}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="mt-6 max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
                            {name}
                        </h1>

                        {bio && (
                            <p className="text-sm md:text-lg text-gray-600 dark:text-zinc-400 leading-relaxed italic">
                                "{bio}"
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}