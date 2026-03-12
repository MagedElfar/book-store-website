import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthState } from "@/features/auth/hooks/useAuthState";

import { createAddressApi } from "../api/post";
import { ADDRESS_QUERY_KEY } from "../constants/api";
import type { CreateAddressPayload } from "../types/request";

export function useCreateAddress() {
    const queryClient = useQueryClient();

    const { user } = useAuthState()
    const userId = user?.id


    return useMutation({
        // Use the provider we built earlier
        mutationFn: (data: CreateAddressPayload) => createAddressApi({
            ...data,
            user_id: userId || ""
        }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ADDRESS_QUERY_KEY, userId]
            });
        },

    });
}