import { supabaseOrderProvider } from "../infrastructure/supabaseOrderProvider";
import { OrderApiProvider } from "../types/api";

export const orderApiProvider: OrderApiProvider = supabaseOrderProvider;

export const ORDER_QUERY_KEY = "orders";