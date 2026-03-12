import { userAddressProvider } from "../constants/api";
import { CreateAddressPayload } from "../types/request";

export const createAddressApi = (payload: CreateAddressPayload) => userAddressProvider.createAddress(payload)