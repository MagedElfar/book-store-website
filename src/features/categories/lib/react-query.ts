import { QueryClient } from "@tanstack/react-query";

import { INFINITE_RECORDED_LIMIT } from "@/shared/config/constants";

import { getCategoriesClient } from "../api/get";
import { CATEGORY_INFINITE_QUERY } from "../constants/api";

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