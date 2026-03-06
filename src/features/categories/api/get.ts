import { categoryApiProvider } from "../constants";
import type { CategoriesParams } from "../types";

export const getCategoryBySlug = (slug: string) => categoryApiProvider.getCategoryBySlug(slug);

export const getCategories = (params: CategoriesParams) => categoryApiProvider.getCategories(params);
