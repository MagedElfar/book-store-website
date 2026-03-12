import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBooBySlugApi } from "@/features/books/api/get";
import { BookGallerySection } from "@/features/books/sections/BookGallerySection";
import { BookInfoSection } from "@/features/books/sections/BookInfoSection";
import { PageLayout } from "@/shared/components/layout/PageLayout";
import { getAppTranslation } from "@/shared/lib/getTranslations";

interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { getLocalizedValue, lang } = await getAppTranslation("books")
    const book = await getBooBySlugApi(slug);

    if (!book) return { title: "Book Not Found" };

    const title = getLocalizedValue(book, "title");
    const rawDescription = getLocalizedValue(book, "description") || "";

    const cleanDescription = rawDescription
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&[a-z0-9]+;/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

    // 2. قص النص لـ 160 حرف
    const truncatedDescription = cleanDescription.length > 160
        ? cleanDescription.substring(0, 157) + "..."
        : cleanDescription;
    return {
        title,
        description: truncatedDescription,
        openGraph: {
            type: 'website',
            title,
            description: truncatedDescription,
            images: [book.cover_image || ""],
            locale: lang
        }
    };
}

export default async function SingleBookPage({ params }: Props) {
    const { slug } = await params;

    const book = await getBooBySlugApi(slug);

    if (!book) notFound();

    return (
        <PageLayout>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-28">
                        <BookGallerySection
                            coverImage={book.cover_image}
                            images={book.book_images}
                        />
                    </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-10">
                    <BookInfoSection book={book} />
                </div>
            </div>
        </PageLayout>
    );
}