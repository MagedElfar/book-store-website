"use client";

import { Loader2 } from "lucide-react";
import { useMemo } from "react";

import { DataHandler } from "@/shared/components/feedback/DataHandler";
import { PageTitle } from "@/shared/components/layout/PageTitle";
import { Button } from "@/shared/components/shadcn/button";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { useDialog } from "@/shared/hooks/useDialog";

import { OrderCard } from "../components/OrderCard";
import { LoadingOrdersList } from "../components/OrderCardSkeleton";
import { OrderDrawer } from "../components/OrderDrawer";
import { useGetOrders } from "../hooks/useGetOrders";
import { Order } from "../types/order";

export function OrdersView() {
    const { t: tOrder } = useAppTranslation("order");

    const { data, isView, openView, closeDialog } = useDialog<Order>();

    const {
        data: ordersData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
        isError
    } = useGetOrders();


    const orders = useMemo(() => ordersData?.pages.flatMap(p => p.items) || [], [ordersData])

    return (
        <>
            <PageTitle
                nested
                title={tOrder("myOrders")}
            />

            <DataHandler
                isLoading={isLoading}
                isError={isError}
                data={orders}
                onRetry={refetch}
                isEmpty={orders?.length === 0}
                loadingComponent={<LoadingOrdersList />}
            >
                {(ordersData: Order[]) => (
                    <div className="space-y-8">
                        <div className="space-y-4">
                            {ordersData.map(order => <OrderCard
                                key={order.id}
                                order={order}
                                onClick={openView}
                            />)}
                        </div>

                        {hasNextPage && <div className="flex justify-center pb-10">
                            <Button
                                variant="outline"
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="rounded-full px-8"
                            >
                                {isFetchingNextPage ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {tOrder("feedback.loading")}
                                    </>
                                ) : (
                                    tOrder("actions.loadMore")
                                )}
                            </Button>
                        </div>}
                    </div>
                )}
            </DataHandler>

            <OrderDrawer
                key={`order-${data?.id}`}
                order={data}
                onClose={closeDialog}
                open={isView}
            />
        </>
    );
}