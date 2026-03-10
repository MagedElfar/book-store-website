import { QueryClient } from "@tanstack/react-query";

import { INFINITE_RECORDED_LIMIT } from "@/shared/config";

import { getTagsClient } from "../api";
import { TAG_INFINITE_QUERY } from "../constants";

export const prefetchInfiniteTags = (queryClient: QueryClient) => queryClient.prefetchInfiniteQuery({
    queryKey: [...TAG_INFINITE_QUERY, ""],
    queryFn: ({ pageParam = 1 }) =>
        getTagsClient({
            search: "",
            page: pageParam,
            limit: INFINITE_RECORDED_LIMIT,
            sortBy: "alpha"
        }),
    initialPageParam: 1
});