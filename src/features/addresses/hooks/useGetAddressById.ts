import { useQuery } from "@tanstack/react-query";

import { useAuthState } from "@/features/auth/hooks/useAuthState";

import { getAddressById } from "../api/get";
import { ADDRESS_QUERY_KEY } from "../constants/api";


export function useGetAddressById(id?: string) {
    const { user } = useAuthState()
    const userId = user?.id

    return useQuery({
        queryKey: [ADDRESS_QUERY_KEY, userId, id],
        queryFn: () => getAddressById(id!),
        enabled: !!id && !!user?.id
    })
}