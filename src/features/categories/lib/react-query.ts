import { QueryClient } from "@tanstack/react-query";
import { getCategoriesClient } from "../api";
import { CATEGORY_INFINITE_QUERY } from "../constants";
import { INFINITE_RECORDED_LIMIT } from "@/shared/config";

export const prefetchInfiniteCategory = (queryClient: QueryClient) => queryClient.prefetchInfiniteQuery({
    queryKey: [...CATEGORY_INFINITE_QUERY, ""],
    queryFn: ({ pageParam = 1 }) =>
        getCategoriesClient({
            search: "",
            page: pageParam,
            limit: INFINITE_RECORDED_LIMIT,
            sortBy: "alpha"
        }),
    initialPageParam: 1
});