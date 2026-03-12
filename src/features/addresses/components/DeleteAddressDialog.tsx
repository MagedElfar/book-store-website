"use client";

import { Loader2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/components/shadcn/alert-dialog";
import { buttonVariants } from "@/shared/components/shadcn/button";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { errorMapper } from "@/shared/utils/error";

import { useDeleteAddress } from "../hooks/useDeleteAddress";

// shadcn UI components



interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    addressId: string;
    userId: string;
}

export function DeleteAddressDialog({ open, onClose, addressId, userId, onSuccess }: Props) {
    const { t: tAddress } = useAppTranslation("addresses");
    const { t: tCommon } = useAppTranslation("common");

    const { mutateAsync: deleteAddress, isPending } = useDeleteAddress(userId);

    const handleConfirm = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            await deleteAddress(addressId);
            toast.success(tAddress("feedback.successDeleteAddress"));
            onSuccess?.();
            onClose();
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 text-destructive mb-2">
                        <div className="p-2 bg-destructive/10 rounded-full">
                            <Trash2 className="w-5 h-5" />
                        </div>
                        <AlertDialogTitle className="text-xl">
                            {tAddress("dialogs.deleteTitle")}
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-base leading-relaxed">
                        {tAddress("dialogs.deleteDescription")}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel
                        disabled={isPending}
                        className="hover:bg-accent transition-colors"
                    >
                        {tCommon("actions.cancel")}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={isPending}
                        className={buttonVariants({ variant: "destructive" })}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {tCommon("actions.deleting")}
                            </>
                        ) : (
                            tCommon("actions.delete")
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteAddressDialog;