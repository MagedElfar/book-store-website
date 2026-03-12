import type { GetManyResponse } from "@/shared/types/response";

import type { Book } from "./book";
import type { BookParams } from "./request";

export interface BookApiProvider {
    getBookBySlug: (slug: string) => Promise<Book | null>,
    getBooks: (params: BookParams) => Promise<GetManyResponse<Book>>,
}