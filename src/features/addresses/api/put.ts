import { userAddressProvider } from "../constants/api";
import { UpdateAddressPayload } from "../types/request";

export const updateAddressApi = (id: string, payload: UpdateAddressPayload) => userAddressProvider.updateAddress(id, payload)