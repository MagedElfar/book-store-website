"use client"

import { useAuthState } from "@/features/auth/hooks/useAuthState"
import { useCartStore } from "@/store/use-cart-store"

import { CheckoutSkeleton } from "../components/CheckoutSkeleton"
import { CreateOrderForm } from "../form/CreateOrderForm"

export function CheckoutView() {

    const { isLoading: isAuthLoading } = useAuthState()
    const isCartLoading = useCartStore(s => s.isLoading)

    if (isAuthLoading || isCartLoading)
        return <CheckoutSkeleton />

    return (
        <CreateOrderForm />
    )
}
