"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/shared/components/shadcn/dialog";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { AddressForm } from "../forms/AddressForm";
import { UserAddress } from "../types/address";


interface Props {
    open: boolean;
    onClose: () => void;
    address?: UserAddress | null;
}

export function AddressFormDialog({ open, onClose, address }: Props) {
    const { t } = useAppTranslation("addresses");


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl  max-h-[90vh] overflow-y-auto no-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold tracking-tight">
                        {address ? t("titles.EditAdders") : t("titles.createAddress")}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm">
                        {address
                            ? t("descriptions.editYourAddress")
                            : t("descriptions.addNewAddress")}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <AddressForm
                        address={address}
                        onSuccess={onClose}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}