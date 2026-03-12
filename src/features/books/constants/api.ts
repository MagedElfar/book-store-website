import { supabaseBookProvider } from "../infrastructure/supabaseBookProvider";
import { BookApiProvider } from "../types/api";

export const bookApiProvider: BookApiProvider = supabaseBookProvider;

export const BOOK_QUERY_KEY = "books";