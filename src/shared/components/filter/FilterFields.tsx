import { getAuthorsClient } from "@/features/authors/api/get";
import { AUTHOR_INFINITE_QUERY } from "@/features/authors/constants/api";
import { getCategoriesClient } from "@/features/categories/api/get";
import { CATEGORY_INFINITE_QUERY } from "@/features/categories/constants/api";
import { getTagsClient } from "@/features/tags/api/get";
import { TAG_INFINITE_QUERY } from "@/features/tags/constants/api";
import { useBookFilters } from "@/shared/hooks/use-book-filters";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { BaseFilterList } from "./BaseFilterList";
import { PriceFilter } from "./PriceFilter";

export const FilterFields = ({ hideAuthors, hideCategories }: { hideAuthors?: boolean, hideCategories?: boolean }) => {
    const { t } = useAppTranslation("common");
    const { updateParams, getActiveIds, searchParams } = useBookFilters();

    return (
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8 scroll-smooth">
            {/* Categories */}
            {
                !hideCategories && <>
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <BaseFilterList
                            title={t("filters.categories")}
                            queryKey={CATEGORY_INFINITE_QUERY}
                            fetchFn={getCategoriesClient}
                            activeIds={getActiveIds("category_ids")}
                            onSelect={(id) => updateParams("category_ids", id, true)}
                            onClear={() => updateParams("category_ids", "")}
                            placeholder={t("filters.search")}
                            multiSelect={true}
                        />
                    </div>

                    <div className="h-px bg-slate-200 dark:bg-zinc-800 w-full" />
                </>
            }


            {/* Authors */}
            {
                !hideAuthors && <>
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <BaseFilterList
                            title={t("filters.authors")}
                            queryKey={AUTHOR_INFINITE_QUERY}
                            fetchFn={getAuthorsClient}
                            activeIds={getActiveIds("author_ids")}
                            onSelect={(id) => updateParams("author_ids", id, true)}
                            onClear={() => updateParams("author_ids", "")}
                            placeholder={t("filters.search")}
                            multiSelect={true}
                        />
                    </div>

                    <div className="h-px bg-slate-200 dark:bg-zinc-800 w-full" />

                </>
            }

            {/* Tags */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <BaseFilterList
                    title={t("filters.tags")}
                    queryKey={TAG_INFINITE_QUERY}
                    fetchFn={getTagsClient}
                    activeIds={getActiveIds("tag_ids")}
                    onSelect={(id) => updateParams("tag_ids", id, true)}
                    onClear={() => updateParams("tag_ids", "")}
                    placeholder={t("filters.search")}
                    multiSelect={true}
                />
            </div>

            <div className="h-px bg-slate-200 dark:bg-zinc-800 w-full" />

            {/* Price Filter */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-4">
                <PriceFilter
                    key={`${searchParams.get("min_price")}-${searchParams.get("max_price")}`}
                    title={t("filters.price")}
                    minKey="min_price"
                    maxKey="max_price"
                    updateParams={updateParams}
                    initialMin={searchParams.get("min_price") || ""}
                    initialMax={searchParams.get("max_price") || ""}
                />
            </div>
        </div>
    );
};