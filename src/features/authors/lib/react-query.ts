import { QueryClient } from "@tanstack/react-query";
import { getAuthorsClient } from "../api";
import { AUTHOR_INFINITE_QUERY } from "../constants";
import { INFINITE_RECORDED_LIMIT } from "@/shared/config";

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