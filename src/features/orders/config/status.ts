import { OrderStatus, PaymentStatus } from '../types/order';

export const ORDER_STATUS_CONFIG: Record<
    OrderStatus,
    { variant: "default" | "secondary" | "destructive" | "outline", className?: string }
> = {
    pending: { variant: "outline", className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800" },
    processing: { variant: "secondary", className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800" },
    shipped: { variant: "secondary", className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800" },
    completed: { variant: "default", className: "bg-emerald-500 hover:bg-emerald-600 text-white border-none" },
    cancelled: { variant: "destructive", className: "" },
    returned: { variant: "outline", className: "opacity-70" },
};

export const PAYMENT_STATUS_CONFIG: Record<
    PaymentStatus,
    { variant: "default" | "secondary" | "destructive" | "outline", className?: string }
> = {
    pending: { variant: "outline", className: "border-amber-500 text-amber-600" },
    paid: { variant: "default", className: "bg-emerald-500 hover:bg-emerald-600" },
    failed: { variant: "destructive", className: "" },
    refunded: { variant: "secondary", className: "bg-slate-200 text-slate-700" },
};