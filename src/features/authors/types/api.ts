import type { GetManyResponse } from "@/shared/types";

import type { Author } from "./author";
import type { AuthorsParams } from "./request";

export interface AuthorApiProvider {
    getAuthorBySlug: (slug: string) => Promise<Author | null>;
    getAuthors: (params?: AuthorsParams) => Promise<GetManyResponse<Author>>;
    getAuthorsClient: (params?: AuthorsParams) => Promise<GetManyResponse<Author>>;
}