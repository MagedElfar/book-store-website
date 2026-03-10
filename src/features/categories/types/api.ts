import type { GetManyResponse } from "@/shared/types";

import { Category } from "./category";
import type { CategoriesParams } from "./request";

export interface CategoryApiProvider {
    getCategories: (params: CategoriesParams) => Promise<GetManyResponse<Category>>;
    getCategoriesClient: (params: CategoriesParams) => Promise<GetManyResponse<Category>>;
    getCategoryBySlug: (slug: string) => Promise<Category | null>;
}