import { categoryApiProvider } from "../constants/api";
import { CategoriesParams } from "../types/request";

export const getCategoryBySlug = (slug: string) => categoryApiProvider.getCategoryBySlug(slug);

export const getCategories = (params: CategoriesParams) => categoryApiProvider.getCategories(params);

export const getCategoriesClient = (params: CategoriesParams) => categoryApiProvider.getCategoriesClient(params);
