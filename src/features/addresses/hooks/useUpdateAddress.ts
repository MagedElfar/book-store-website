import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthState } from "@/features/auth/hooks/useAuthState";

import { updateAddressApi } from "../api/put";
import { ADDRESS_QUERY_KEY } from "../constants/api";
import type { UpdateAddressPayload } from "../types/request";

export function useUpdateAddress() {
    const queryClient = useQueryClient();

    const { user } = useAuthState()
    const userId = user?.id

    return useMutation({
        // Accepts id and payload as an object to match your pattern
        mutationFn: ({ id, data }: { id: string; data: UpdateAddressPayload }) => updateAddressApi(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ADDRESS_QUERY_KEY, userId]
            });
        },
    });
}