import { authorApiProvider } from "../constants";
import type { AuthorsParams } from "../types";

export const getAuthorBySlug = (slug: string) => authorApiProvider.getAuthorBySlug(slug);

export const getAuthors = (params?: AuthorsParams) => authorApiProvider.getAuthors(params);

export const getAuthorsClient = (params?: AuthorsParams) => authorApiProvider.getAuthorsClient(params);
