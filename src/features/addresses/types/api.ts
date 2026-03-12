// src/features/users/sub-features/addresses/types/api-provider.ts

import { UserAddress } from "./address";
import type { CreateAddressPayload, UpdateAddressPayload } from "./request";


export interface AddressApiProvider {
    getAddressById: (id: string) => Promise<UserAddress>;
    getAddressesByUserId: (userId: string) => Promise<UserAddress[]>;
    createAddress: (payload: CreateAddressPayload) => Promise<UserAddress>;
    updateAddress: (id: string, payload: UpdateAddressPayload) => Promise<UserAddress>;
    deleteAddress: (id: string) => Promise<void>;
}