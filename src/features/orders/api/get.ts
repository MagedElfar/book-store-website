import { orderApiProvider } from "../constants/api"
import { OrderParams } from "../types/request"

export const getOrderById = (id: string) => orderApiProvider.getOrderById(id)

export const getOrdersApi = (params: OrderParams) => orderApiProvider.getOrders(params)

