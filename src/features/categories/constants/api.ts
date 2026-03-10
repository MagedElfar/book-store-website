import { supabaseCategoryProvider } from "../infrastructure";
import type { CategoryApiProvider } from "../types";

export const categoryApiProvider: CategoryApiProvider = supabaseCategoryProvider;


export const CATEGORY_QUERY_KEY = "categories";

export const CATEGORY_INFINITE_QUERY = [CATEGORY_QUERY_KEY, "infinite"];