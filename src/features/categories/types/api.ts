import type { GetManyResponse } from "@/shared/types";
import type { CategoriesParams } from "./request";
import { Category } from "./category";

export interface CategoryApiProvider {
    getCategories: (params: CategoriesParams) => Promise<GetManyResponse<Category>>;
    getCategoryBySlug: (slug: string) => Promise<Category>;
}