// src/features/users/sub-features/addresses/views/AddressesView.tsx

"use client";

import { Plus } from "lucide-react";
import { useParams } from "next/navigation";

import { DataHandler } from "@/shared/components/feedback/DataHandler";
import { PageTitle } from "@/shared/components/layout/PageTitle";
import { Button } from "@/shared/components/shadcn/button";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { useDialog } from "@/shared/hooks/useDialog";

import { LoadingAddressList } from "../components/AddressCardSkeleton";
import { AddressFormDialog } from "../components/AddressFormDialog";
import { AddressList } from "../components/AddressList";
import DeleteAddressDialog from "../components/DeleteAddressDialog";
import { useGetAddresses } from "../hooks/useGetAddresses";
import { UserAddress } from "../types/address";

export function AddressesView() {
    const { t: tAddresses } = useAppTranslation("addresses");
    const { id: userId } = useParams<{ id: string }>();

    // استخدام الـ Hook الموحد للـ Dialogs
    const { data, openCreate, openDelete, openEdit, closeDialog, isCreate, isEdit, isDelete } = useDialog<UserAddress>();

    // جلب البيانات
    const { data: addresses, isLoading, isError, refetch } = useGetAddresses();

    return (
        <>
            <PageTitle
                nested
                title={tAddresses("myAddress")}
                actions={
                    <Button
                        variant="outline"
                        onClick={openCreate}
                        className="gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        {tAddresses("actions.addAddress")}
                    </Button>
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
                {(addressesData: UserAddress[]) => (
                    <AddressList
                        addresses={addressesData}
                        onEdit={openEdit}
                        onDelete={openDelete}
                    />
                )}
            </DataHandler>

            <DeleteAddressDialog
                open={isDelete}
                addressId={data?.id || ""}
                userId={userId!}
                onClose={closeDialog}
            />

            <AddressFormDialog
                key={data?.id || "new-address"}
                open={isCreate || isEdit}
                address={isCreate ? null : data}
                onClose={closeDialog}
            />
        </>
    );
}