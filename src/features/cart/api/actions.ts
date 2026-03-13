import { cartApiProvider } from "../constants/api"
import { UpsertCartPayload } from "../types/request"

export const getCartApi = (userId: string) => cartApiProvider.getCart(userId)

export const clearCartApi = (userId: string) => cartApiProvider.clearCart(userId)

export const removeItemApi = (userId: string, bookId: string) => cartApiProvider.removeItem(userId, bookId)

export const upsertItemsApi = (payload: UpsertCartPayload[]) => cartApiProvider.upsertItems(payload)