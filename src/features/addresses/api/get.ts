import { userAddressProvider } from "../constants/api"

export const getAddressById = (id: string) => userAddressProvider.getAddressById(id)

export const getAddressesApi = (userId: string) => userAddressProvider.getAddressesByUserId(userId)
