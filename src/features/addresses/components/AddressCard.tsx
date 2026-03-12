// src/features/users/sub-features/addresses/components/AddressCard.tsx

import { MapPin, Phone, Pencil, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";

import { MapSkeleton } from "@/shared/components/map/MapSkeleton";
import { Badge } from "@/shared/components/shadcn/badge";
import { Button } from "@/shared/components/shadcn/button";
import { Card, CardContent } from "@/shared/components/shadcn/card";
import { Separator } from "@/shared/components/shadcn/separator";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/shared/components/shadcn/tooltip";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { UserAddress } from "../types/address";


const MapDisplay = dynamic(() => import("@/shared/components/map/MapDisplay"), {
    ssr: false,
    loading: () => <MapSkeleton />
});

interface Props {
    address: UserAddress;
    onEdit: (id: string) => void;
    onDelete: (address: UserAddress) => void;
}

export function AddressCard({ address, onEdit, onDelete }: Props) {
    const { t: tAddress } = useAppTranslation("addresses");
    const { t: tCommon } = useAppTranslation("common");

    return (
        <Card className="h-full border-muted-foreground/10 shadow-sm overflow-hidden">
            <CardContent className="p-5">
                {/* Header: Name & Actions */}
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground leading-none">
                                {address.full_name}
                            </span>
                            {address.is_default && (
                                <Badge variant="default" className="text-[10px] px-2 py-0 h-5">
                                    {tAddress("labels.default")}
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Phone className="w-3.5 h-3.5" />
                            <span className="text-xs tracking-tight">{address.phone || "N/A"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                        <TooltipProvider delayDuration={300}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                                        onClick={() => onEdit(address.id)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{tCommon("actions.edit")}</TooltipContent>
                            </Tooltip>

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
                        </TooltipProvider>
                    </div>
                </div>

                <Separator className="mb-4 bg-muted/50 border-dashed" />

                {/* Location Text */}
                <div className="flex gap-2 mb-4 min-h-[40px]">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80 leading-relaxed">
                        {address.street_address}, {address.city}, {address.country}
                    </p>
                </div>

                {/* Map Preview */}
                <div className="rounded-lg overflow-hidden border border-border/50">
                    {!!address.lat && !!address.lng && (
                        <MapDisplay
                            lat={address.lat}
                            lng={address.lng}
                            height={150}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}