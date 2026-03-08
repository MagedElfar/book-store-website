import { supabaseAuthorProvider } from "../infrastructure";
import type { AuthorApiProvider } from "../types";

export const authorApiProvider: AuthorApiProvider = supabaseAuthorProvider;

export const AUTHOR_QUERY_KEY = "authors";

export const AUTHOR_INFINITE_QUERY = [AUTHOR_QUERY_KEY, "infinite"]