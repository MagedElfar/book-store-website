import { userAddressProvider } from "../constants/api";

export const deleteAddressApi = (id: string) => userAddressProvider.deleteAddress(id)