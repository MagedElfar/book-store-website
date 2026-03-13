// src/features/users/sub-features/addresses/components/AddressCard.tsx
import { MapPin, Phone, Pencil, Trash2, CheckCircle2, Check } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

import { MapSkeleton } from "@/shared/components/map/MapSkeleton";
import { Badge } from "@/shared/components/shadcn/badge";
import { Button } from "@/shared/components/shadcn/button";
import { Card, CardContent } from "@/shared/components/shadcn/card";
import { Separator } from "@/shared/components/shadcn/separator";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/shared/components/shadcn/tooltip";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";
import { errorMapper } from "@/shared/utils/error";

import { useUpdateAddress } from "../hooks/useUpdateAddress";
import { UserAddress } from "../types/address";

const MapDisplay = dynamic(() => import("@/shared/components/map/MapDisplay"), {
    ssr: false,
    loading: () => <MapSkeleton />,
});

interface Props {
    address: UserAddress;
    onEdit?: (address: UserAddress) => void;
    onDelete?: (address: UserAddress) => void;
    onSetDefault?: (address: UserAddress) => void;
    isSelected?: boolean;
}

export function AddressCard({ address, onEdit, onDelete, onSetDefault, isSelected }: Props) {
    const { t: tAddress } = useAppTranslation("addresses");
    const { t: tCommon } = useAppTranslation("common");
    const { mutateAsync: updateAddress, isPending } = useUpdateAddress();

    const handleSetDefault = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPending) return
        try {
            await updateAddress({ id: address.id, data: { is_default: true } });
            onSetDefault?.(address);
            toast.success(tAddress("feedback.successSetDefault"));
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <Card
            className={cn(
                "h-full border-muted-foreground/10 shadow-sm overflow-hidden transition-all relative",
                isSelected && "ring-2 ring-emerald-500 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20",
                address.is_default && !isSelected && "border-primary/30"
            )}
        >
            {isSelected && (
                <div className="absolute top-2 right-2 z-20 bg-emerald-500 text-white rounded-full p-1 shadow-md animate-in zoom-in duration-300">
                    <Check className="w-4 h-4" />
                </div>
            )}
            <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground leading-none">
                                {address.full_name}
                            </span>
                            {address.is_default && (
                                <Badge variant="default" className="text-[10px] px-2 py-0 h-5 bg-primary/10 text-primary border-none shadow-none">
                                    {tAddress("labels.default")}
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Phone className="w-3.5 h-3.5" />
                            <span className="text-xs tracking-tight">{address.phone || "N/A"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                        <TooltipProvider delayDuration={300}>
                            {!address.is_default && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5"
                                            onClick={handleSetDefault}
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>{tAddress("actions.setAsDefault")}</TooltipContent>
                                </Tooltip>
                            )}

                            {onEdit && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                                            onClick={() => onEdit(address)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>{tCommon("actions.edit")}</TooltipContent>
                                </Tooltip>
                            )}

                            {onDelete && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                            onClick={() => onDelete(address)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>{tCommon("actions.delete")}</TooltipContent>
                                </Tooltip>
                            )}
                        </TooltipProvider>
                    </div>
                </div>

                <Separator className="mb-4 bg-muted/50 border-dashed" />

                <div className="flex gap-2 mb-4 min-h-[40px]">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
                        {address.street_address}, {address.city}, {address.country}
                    </p>
                </div>

                {/* Map Preview مع Key لحل مشكلة appendChild */}
                <div className="rounded-lg overflow-hidden border border-border/50 bg-muted/20">
                    {!!address.lat && !!address.lng && (
                        <MapDisplay
                            key={`${address.id}-${address.lat}-${address.is_default}`}
                            lat={address.lat}
                            lng={address.lng}
                            height={120}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}