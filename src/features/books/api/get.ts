import { bookApiProvider } from "../constants";
import type { BookParams } from "../types";

export const getBooBySlugApi = (slug: string) => bookApiProvider.getBookBySlug(slug)

export const getBooKsApi = (params: BookParams) => bookApiProvider.getBooks(params)

