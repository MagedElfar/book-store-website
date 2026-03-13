"use client";

import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { LoadingAddressList } from "@/features/addresses/components/AddressCardSkeleton";
import { AddressFormDialog } from "@/features/addresses/components/AddressFormDialog";
import { AddressList } from "@/features/addresses/components/AddressList";
import { useGetAddresses } from "@/features/addresses/hooks/useGetAddresses";
import { UserAddress } from "@/features/addresses/types/address";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { DataHandler } from "@/shared/components/feedback/DataHandler";
import { Button } from "@/shared/components/shadcn/button";
import { FormCountrySelect } from "@/shared/form/components/inputs/FormCountrySelect";
import { FormTextAreaField } from "@/shared/form/components/inputs/FormTextAreaField";
import { FormTextField } from "@/shared/form/components/inputs/FormTextField";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { useDialog } from "@/shared/hooks/useDialog";

import { CreateOrderFormSchemaType } from "../schema/CreateOrderFormSchema";

export function ShippingAddressSection() {
    const { t } = useAppTranslation("order");
    const { user } = useAuthState();
    const { setValue } = useFormContext<CreateOrderFormSchemaType>();

    const { data: addresses, isLoading, isError, refetch } = useGetAddresses();
    const { data, openCreate, closeDialog, isCreate, isEdit } = useDialog<UserAddress>();

    const defaultAddress = useMemo(() => addresses?.find(addr => addr.is_default), [addresses]);
    const [selectedId, setSelectedId] = useState<string | undefined>();

    const updateFormAddress = useCallback((address: UserAddress) => {
        setSelectedId(address.id);
        setValue("shipping_details", {
            country: address.country!,
            city: address.city!,
            street_address: address.street_address!,
        }, { shouldValidate: true });
    }, [setValue])

    useEffect(() => {
        if (defaultAddress && !selectedId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            updateFormAddress(defaultAddress);
        }
    }, [defaultAddress, selectedId, updateFormAddress]);

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-4">
                <h3 className="text-lg font-bold min-w-max text-primary">
                    {t("fields.shippingAddress")}
                </h3>
                <div className="h-[1px] w-full bg-slate-200 dark:bg-zinc-800" />
            </div>

            {user ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">

                            {t("fields.selectFromSaved")}
                        </p>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => openCreate()}
                        >
                            <Plus size={16} />
                            {t("fields.addNewAddress")}
                        </Button>
                    </div>

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
                                onSelect={updateFormAddress}
                                selectedAddressId={selectedId}
                            />
                        )}
                    </DataHandler>

                    <AddressFormDialog
                        key={data?.id || "new-address"}
                        open={isCreate || isEdit}
                        address={isCreate ? null : data}
                        onClose={closeDialog}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-500">
                    <FormCountrySelect
                        label={t("fields.country")}
                        name="shipping_details.country"
                    />
                    <FormTextField
                        required
                        name="shipping_details.city"
                        label={t("fields.city")}
                    />

                    <div className="sm:col-span-2">
                        <FormTextAreaField
                            name="shipping_details.street_address"
                            placeholder={t("fields.address")}
                            rows={4}
                            className="bg-slate-50 dark:bg-zinc-900/50"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}