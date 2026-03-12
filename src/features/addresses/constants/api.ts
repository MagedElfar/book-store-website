import { supabaseAddressProvider } from "../infrastructure/supabaseAddressProvider"
import { AddressApiProvider } from "../types/api"

export const userAddressProvider: AddressApiProvider = supabaseAddressProvider


export const ADDRESS_QUERY_KEY = "users-addresses"