import { supabaseTagProvider } from "../infrastructure/supabaseTagProvider";
import { TagApiProvider } from "../types/api";

export const tagApiProvider: TagApiProvider = supabaseTagProvider;

export const TAG_QUERY_KEY = "tags";

export const TAG_INFINITE_QUERY = [TAG_QUERY_KEY, "infinite"];