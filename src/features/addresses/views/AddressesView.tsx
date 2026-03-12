"use client";

import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

import { DataHandler } from "@/shared/components/feedback/DataHandler";
import { PageTitle } from "@/shared/components/layout/PageTitle";
import { Button } from "@/shared/components/shadcn/button";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { AddressCard } from "../components/AddressCard";
import { LoadingAddressList } from "../components/AddressCardSkeleton";
import { AddressFormDialog } from "../components/AddressFormDialog";
import DeleteAddressDialog from "../components/DeleteAddressDialog";
import { useGetAddresses } from "../hooks/useGetAddresses";
import { UserAddress } from "../types/address";



export function AddressesView() {
    const { t: tAddresses } = useAppTranslation("addresses");

    const { id: userId } = useParams<{ id: string }>();

    // --- State ---
    const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [addressToEdit, setAddressToEdit] = useState<UserAddress | null>(null);

    // --- Data Fetching ---
    const { data: addresses, isLoading, isError, refetch } = useGetAddresses();

    // --- Handlers ---
    const handleAddClick = () => {
        console.log("clicccc")
        setAddressToEdit(null); // لضمان أن الفورم سيفتح كـ "إضافة"
        setIsFormDialogOpen(true);
    };

    const handleEditClick = (address: UserAddress) => {
        setAddressToEdit(address); // نمرر بيانات العنوان للفورم
        setIsFormDialogOpen(true);
    };

    const handleDeleteClick = (address: UserAddress) => {
        setSelectedAddress(address);
        setIsDeleteDialogOpen(true);
    };

    return (
        <>
            <PageTitle
                nested
                title={tAddresses("myAddress")}
                actions={
                    <>
                        <Button
                            variant="outline"
                            onClick={handleAddClick}
                            className="gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            {tAddresses("actions.addAddress")}
                        </Button>
                    </>
                }
            />

            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={addresses}
                onRetry={refetch}
                isEmpty={addresses?.length === 0}
                loadingComponent={<LoadingAddressList />}
            >
                {(addresses: UserAddress[]) => (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {addresses.map((address) => (
                                <div key={address.id} className="h-full">
                                    <AddressCard
                                        address={address}
                                        onEdit={() => handleEditClick(address)}
                                        onDelete={() => handleDeleteClick(address)}
                                    />
                                </div>
                            ))}
                        </div>

                        <DeleteAddressDialog
                            open={isDeleteDialogOpen}
                            addressId={selectedAddress?.id || ""}
                            userId={userId!}
                            onClose={() => {
                                setIsDeleteDialogOpen(false);
                                setSelectedAddress(null);
                            }}
                        />

                        <AddressFormDialog
                            key={addressToEdit?.id || "new-address"}
                            open={true}
                            address={addressToEdit}
                            userId={userId!}
                            onClose={() => {
                                setIsFormDialogOpen(false);
                                setAddressToEdit(null);
                            }}
                        />
                    </>
                )}
            </DataHandler>
        </>
    );
}