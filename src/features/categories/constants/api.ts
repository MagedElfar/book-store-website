import { supabaseCategoryProvider } from "../infrastructure/supabaseCategoryProvider";
import { CategoryApiProvider } from "../types/api";

export const categoryApiProvider: CategoryApiProvider = supabaseCategoryProvider;


export const CATEGORY_QUERY_KEY = "categories";

export const CATEGORY_INFINITE_QUERY = [CATEGORY_QUERY_KEY, "infinite"];