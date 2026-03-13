"use client";

import { DataHandler } from "@/shared/components/feedback/DataHandler";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/shared/components/shadcn/sheet";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { OrderDetailsSkeleton } from "./OrderDetailsSkeleton";
import { OrderItemsReview } from "./OrderItemsReview";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { useGetOrderById } from "../hooks/useGetOrderById";
import { Order } from "../types/order";

interface OrderDrawerProps {
    order: Order | null;
    open: boolean;
    onClose: () => void;
}

export function OrderDrawer({ order, open, onClose }: OrderDrawerProps) {
    const { getLocalizedValue, dir } = useAppTranslation("order");
    const side = dir === "rtl" ? "right" : "left";
    const { data, refetch, isLoading, isError } = useGetOrderById(order?.id)
    if (!order) return null;

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side={side} className="w-full sm:max-w-md overflow-y-auto p-4 scrollbar-hide">
                <DataHandler
                    isLoading={isLoading}
                    isError={isError}
                    data={data}
                    onRetry={refetch}
                    isEmpty={!data}
                    loadingComponent={<OrderDetailsSkeleton />}
                >
                    {(ordersData: Order) => (
                        <>
                            <SheetHeader className="mb-6">
                                <SheetTitle className="flex justify-between items-center">
                                    <span>Order Details #{ordersData.order_number}</span>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="space-y-8 pb-10">
                                {/* 1. Items Review */}
                                <OrderItemsReview
                                    items={ordersData.items?.map(item => ({
                                        id: item.id,
                                        name: getLocalizedValue(item.book, "title"),
                                        price: item.price_at_purchase,
                                        quantity: item.quantity,
                                        image: item.book?.cover_image || "/images/img-ph.jpg"
                                    })) || []}
                                    className="bg-transparent border-none p-0"
                                />

                                {/* 2. Billing Summary */}
                                <OrderSummaryCard
                                    subtotal={ordersData.subtotal_amount}
                                    shippingCost={ordersData.shipping_fees}
                                    vatCost={ordersData.vat_amount}
                                    finalTotal={ordersData.total_amount}
                                    className="bg-slate-50 dark:bg-zinc-900/50 p-2"
                                />

                                {/* 3. Customer & Shipping Info */}
                                <div className="grid grid-cols-1 gap-4">
                                    <InfoSection title="Customer Details">
                                        <p className="font-semibold text-sm">{ordersData.customer_name}</p>
                                        <p className="text-xs text-slate-500">{ordersData.customer_email}</p>
                                        <p className="text-xs text-slate-500">{ordersData.customer_phone}</p>
                                    </InfoSection>

                                    <InfoSection title="Shipping Address">
                                        <p className="font-semibold text-sm">{ordersData.shipping_details.city}</p>
                                        <p className="text-xs text-slate-500">{ordersData.shipping_details.street_address}</p>
                                        <p className="text-xs text-primary font-medium">{ordersData.shipping_details.country}</p>
                                    </InfoSection>
                                </div>
                            </div>
                        </>
                    )}
                </DataHandler>

            </SheetContent>
        </Sheet>
    );
}

function InfoSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="p-4 rounded-xl border border-slate-100 dark:border-zinc-800">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">{title}</h4>
            <div className="space-y-1">{children}</div>
        </div>
    );
}