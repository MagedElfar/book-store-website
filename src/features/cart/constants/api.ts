import { supabaseCartProvider } from "../infrastructure/supabaseCartProvider";
import { CartApiProvider } from "../types/api";

export const cartApiProvider: CartApiProvider = supabaseCartProvider;

