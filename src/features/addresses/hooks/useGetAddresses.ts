import { useQuery } from "@tanstack/react-query";

import { useAuthState } from "@/features/auth/hooks/useAuthState";

import { getAddressesApi } from "../api/get";
import { ADDRESS_QUERY_KEY } from "../constants/api";

export function useGetAddresses() {
    const { user } = useAuthState()
    const userId = user?.id
    return useQuery({
        queryKey: [ADDRESS_QUERY_KEY, userId],
        queryFn: () => getAddressesApi(userId!),
        enabled: !!userId,
    });
}