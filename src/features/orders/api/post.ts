import { orderApiProvider } from "../constants/api";
import { CreateOrderRequest } from "../types/request";

export const createOrderApi = (payload: CreateOrderRequest) => orderApiProvider.createOrder(payload);