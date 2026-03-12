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
    userId: string;
}

export function AddressFormDialog({ open, onClose, address, userId }: Props) {
    const { t } = useAppTranslation("addresses");

    console.log("tttt")
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
                        usId={userId}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}