"use client";

import { format } from "date-fns"; // أو أي مكتبة تنسيق تاريخ تفضلها
import { Calendar, Package, ChevronRight } from "lucide-react";

import { Badge } from "@/shared/components/shadcn/badge";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { formatPrice } from "@/shared/utils/helper";

import { ORDER_STATUS_CONFIG } from "../config/status";
import { Order } from "../types/order";

interface OrderCardProps {
    order: Order;
    onClick: (order: Order) => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
    const { lang } = useAppTranslation();
    const statusCfg = ORDER_STATUS_CONFIG[order.status];

    return (
        <div
            onClick={() => onClick(order)}
            className="group relative bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl cursor-pointer hover:border-primary/50 transition-all hover:shadow-md"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                        #{order.order_number}
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(order.created_at), "PPP")}
                    </div>
                </div>
                <Badge variant={statusCfg.variant} className={statusCfg.className}>
                    {order.status}
                </Badge>
            </div>

            <div className="flex justify-between items-end border-t border-slate-50 dark:border-zinc-900 pt-4">
                <div className="flex items-center gap-2">
                    <div className="bg-slate-100 dark:bg-zinc-900 p-2 rounded-lg">
                        <Package className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                        {order.items?.length || 0} {order.items?.length === 1 ? 'Item' : 'Items'}
                    </span>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase tracking-tight">Total Amount</p>
                    <p className="text-lg font-black text-primary">
                        {formatPrice(order.total_amount, lang)}
                    </p>
                </div>
            </div>
        </div>
    );
}