import { GetManyResponse } from "@/shared/types/response";

import type { Order } from "./order";
import type { CreateOrderRequest, OrderParams } from "./request";

export interface OrderApiProvider {
    createOrder: (payload: CreateOrderRequest) => Promise<Order>;
    getOrderById: (id: string) => Promise<Order>;
    getOrders: (params?: OrderParams) => Promise<GetManyResponse<Order>>;
}