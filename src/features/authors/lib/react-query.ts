import { QueryClient } from "@tanstack/react-query";

import { INFINITE_RECORDED_LIMIT } from "@/shared/config/constants";

import { getAuthorsClient } from "../api/get";
import { AUTHOR_INFINITE_QUERY } from "../constants/api";

export const prefetchInfiniteAuthors = (queryClient: QueryClient) => queryClient.prefetchInfiniteQuery({
    queryKey: [...AUTHOR_INFINITE_QUERY, ""],
    queryFn: ({ pageParam = 1 }) =>
        getAuthorsClient({
            search: "",
            page: pageParam,
            limit: INFINITE_RECORDED_LIMIT,
            sortBy: "alpha"
        }),
    initialPageParam: 1
});