import { QueryClient } from "@tanstack/react-query";

import { INFINITE_RECORDED_LIMIT } from "@/shared/config/constants";

import { getTagsClient } from "../api/get";
import { TAG_INFINITE_QUERY } from "../constants/api";


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