import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthState } from "@/features/auth/hooks/useAuthState";

import { createOrderApi } from "../api/post";
import { ORDER_QUERY_KEY } from "../constants/api";
import { CreateOrderRequest } from "../types/request";


export function useCreateOrder() {
    const queryClient = useQueryClient();

    const { user } = useAuthState()

    return useMutation({
        mutationFn: (data: CreateOrderRequest) => createOrderApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ORDER_QUERY_KEY, user?.id]
            });
        }
    });
}