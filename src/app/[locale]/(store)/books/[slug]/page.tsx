import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookGallerySection, BookInfoSection, getBooBySlugApi } from "@/features/books";
import { PageLayout } from "@/shared/components";
import { getAppTranslation } from "@/shared/lib";

interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { t, getLocalizedValue, lang } = await getAppTranslation("books")
    const book = await getBooBySlugApi(slug);

    if (!book) return { title: "Book Not Found" };

    const title = getLocalizedValue(book, "title");
    const rawDescription = getLocalizedValue(book, "description") || "";

    // 1. تنظيف النص من الـ HTML Tags
    // Regex: /<[^>]*>/g بيشيل أي حاجة بين < >
    const plainDescription = rawDescription
        .replace(/<[^>]*>/g, '') // حذف وسوم HTML
        .replace(/\s+/g, ' ')    // تحويل المسافات المتعددة لمسافة واحدة
        .trim();

    // 2. قص النص ليكون 160 حرف (الأفضل للـ SEO)
    const truncatedDescription = plainDescription.length > 160
        ? plainDescription.slice(0, 157) + "..."
        : plainDescription;

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