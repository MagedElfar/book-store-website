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
    const { t, getLocalizedValue } = await getAppTranslation("books")
    const book = await getBooBySlugApi(slug);

    if (!book) return { title: "Book Not Found" };

    const title = getLocalizedValue(book, "title");
    const description = getLocalizedValue(book, "description")

    return {
        title,
        description: description?.slice(0, 160),
        openGraph: {
            title,
            description: description || "",
            images: [book.cover_image || ""],
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