import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { API_RECORDED_LIMIT } from "@/shared/config/constants";
import { useInfiniteLookup } from "@/shared/hooks/useInfiniteLookup";

import { getOrdersApi } from "../api/get";
import { ORDER_QUERY_KEY } from "../constants/api";


export function useGetOrders() {
    const { user } = useAuthState()
    const userId = user?.id
    const limit = API_RECORDED_LIMIT
    return useInfiniteLookup(
        [ORDER_QUERY_KEY, userId],
        (page) => getOrdersApi({ userId: userId, page, limit }),
        !!userId,
        limit
    );

}