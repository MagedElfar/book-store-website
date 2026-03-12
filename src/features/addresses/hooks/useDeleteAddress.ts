import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthState } from "@/features/auth/hooks/useAuthState";

import { deleteAddressApi } from "../api/delete";
import { ADDRESS_QUERY_KEY } from "../constants/api";


export function useDeleteAddress() {
    const queryClient = useQueryClient();
    const { user } = useAuthState()
    const userId = user?.id


    return useMutation({
        mutationFn: (id: string) => deleteAddressApi(id),

        onSuccess: () => {
            // Invalidate the addresses list for this specific user
            queryClient.invalidateQueries({
                queryKey: [ADDRESS_QUERY_KEY, userId]
            });
        }
    });
}