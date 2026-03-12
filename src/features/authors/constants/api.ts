import { supabaseAuthorProvider } from "../infrastructure/supabaseAuthorProvider";
import { AuthorApiProvider } from "../types/api";

export const authorApiProvider: AuthorApiProvider = supabaseAuthorProvider;

export const AUTHOR_QUERY_KEY = "authors";

export const AUTHOR_INFINITE_QUERY = [AUTHOR_QUERY_KEY, "infinite"]