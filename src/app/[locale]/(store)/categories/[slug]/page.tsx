import { notFound } from "next/navigation";

import { BookListSection, getBooKsApi, mapQuerySearchParamsToBookSearchParams } from "@/features/books";
import { CategoryHeader, getCategoryBySlug } from "@/features/categories";
import { PageLayout } from "@/shared/components";
import { calcTotalPages } from "@/shared/utils";


interface Props {
    params: Promise<{ slug: string; locale: string }>;
    searchParams: Promise<Record<string, string>>
}

export default async function CategoryDetailsPage({ params, searchParams }: Props) {
    const { slug } = await params;

    const category = await getCategoryBySlug(slug);

    if (!category || !category.is_active) {
        notFound();
    }

    const sParams = await searchParams;

    const currentPage = Number(sParams.page) || 1;

    const bookParams = mapQuerySearchParamsToBookSearchParams(sParams)

    const books = await getBooKsApi({
        ...bookParams,
        category_id: category.id
    });

    const totalPages = calcTotalPages(books.total || 0, bookParams.limit)

    return (<>
        <CategoryHeader category={category} />

        <PageLayout>
            <BookListSection
                books={books}
                currentPage={currentPage}
                totalPages={totalPages}
                hideCategories
            />
        </PageLayout>
    </>

    );
}