import { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthorHeader, getAuthorBySlug } from "@/features/authors";
import { BookListSection, getBooKsApi, mapQuerySearchParamsToBookSearchParams } from "@/features/books";
import { PageLayout } from "@/shared/components";
import { getAppTranslation } from "@/shared/lib";
import { calcTotalPages } from "@/shared/utils";


interface Props {
    params: Promise<{ slug: string; locale: string }>;
    searchParams: Promise<Record<string, string>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const author = await getAuthorBySlug(slug);
    const { getLocalizedValue, lang } = await getAppTranslation("authors");

    if (!author) return {};

    const name = getLocalizedValue(author, "name");
    const bio = getLocalizedValue(author, "bio") || name;

    return {
        title: name,
        description: bio,
        openGraph: {
            title: name,
            description: bio,
            images: author.image_url ? [author.image_url] : [],
            type: "profile",
            locale: lang,
        },
        twitter: {
            card: "summary",
            title: name,
            description: bio,
            images: author.image_url ? [author.image_url] : [],
        }
    };
}

export default async function AuthorDetailsPage({ params, searchParams }: Props) {
    const { slug } = await params;

    const author = await getAuthorBySlug(slug);

    if (!author || !author.is_active) {
        notFound();
    }

    const sParams = await searchParams;

    const currentPage = Number(sParams.page) || 1;

    const bookParams = mapQuerySearchParamsToBookSearchParams(sParams)

    const books = await getBooKsApi({
        ...bookParams,
        author_id: author.id
    });

    const totalPages = calcTotalPages(books.total || 0, bookParams.limit)

    return (<>
        <AuthorHeader author={author} />

        <PageLayout>
            <BookListSection
                books={books}
                currentPage={currentPage}
                totalPages={totalPages}
                hideAuthors
            />
        </PageLayout>
    </>

    );
}