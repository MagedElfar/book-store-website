import { GlobalLoadingProvider } from "@/providers/GlobalLoaderProvider";
import { calcTotalPages } from "@/shared/utils/helper";

import { BookListSection } from "./BookListSection";
import { getBooKsApi } from "../api/get";
import { mapQuerySearchParamsToBookSearchParams } from "../utils/mapper";


export async function BooksDataWrapper({ searchParamsPromise }: { searchParamsPromise: Promise<Record<string, string>> }) {
    const params = await searchParamsPromise;
    const currentPage = Number(params.page) || 1;
    const bookParams = mapQuerySearchParamsToBookSearchParams(params);

    const books = await getBooKsApi(bookParams);
    const totalPages = calcTotalPages(books.total || 0, bookParams.limit);

    return (
        <GlobalLoadingProvider>
            <BookListSection
                books={books}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </GlobalLoadingProvider>
    );
}
