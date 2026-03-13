// src/features/users/sub-features/addresses/components/AddressList.tsx

import { AddressCard } from "./AddressCard";
import { UserAddress } from "../types/address";

interface AddressListProps {
    addresses: UserAddress[];
    onEdit?: (address: UserAddress) => void;
    onDelete?: (address: UserAddress) => void;
    onSelect?: (address: UserAddress) => void;
    selectedAddressId?: string;
}

export function AddressList({
    addresses,
    onEdit,
    onDelete,
    onSelect,
    selectedAddressId,
}: AddressListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => (
                <div
                    key={address.id}
                    className={`h-full ${onSelect ? "cursor-pointer" : ""}`}
                    onClick={() => onSelect?.(address)}
                >
                    <AddressCard
                        address={address}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        isSelected={selectedAddressId === address.id}
                    />
                </div>
            ))}
        </div>
    );
}