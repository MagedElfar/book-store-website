import { SHIPPING_FEE, VAT_FEE } from "@/shared/config/constants";
import { supabaseClient } from "@/shared/lib/supabaseClient";

import { OrderApiProvider } from "../types/api";
import { Order } from "../types/order";
import { CreateOrderRequest, OrderParams } from "../types/request";

export const supabaseOrderProvider: OrderApiProvider = {

    createOrder: async function (payload: CreateOrderRequest) {
        const shipping_fees = SHIPPING_FEE;
        const subtotal_amount = (payload?.items || []).reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        const vat_amount = subtotal_amount * VAT_FEE;
        const total_amount = subtotal_amount + Number(shipping_fees) + vat_amount;

        // تجهيز بيانات الطلب (JSON)
        const orderData = {
            customer_name: payload.customer_name,
            customer_email: payload.customer_email,
            customer_phone: payload.customer_phone,
            user_id: payload.user_id || null,
            country: payload.shipping_details.country,
            state_province: payload.shipping_details.state,
            city: payload.shipping_details.city,
            shipping_address: payload.shipping_details.street_address,
            postal_code: payload.shipping_details.postal_code,
            payment_method: payload.payment_method,
            note: payload.note || "",
            status: "pending",
            payment_status: "pending",
            subtotal_amount,
            shipping_fees,
            vat_amount,
            total_amount,
        };

        // تجهيز بيانات المنتجات (Array of JSON)
        const itemsData = (payload.items || []).map((item) => ({
            book_id: item.bookId,
            quantity: item.quantity,
            price_at_purchase: item.price,
        }));

        // استدعاء الـ RPC لضمان عملية ذرية (Atomic Transaction)
        const { data: order, error: rpcError } = await supabaseClient.rpc(
            'create_order_with_items',
            {
                p_order_data: orderData,
                p_items_data: itemsData
            }
        );

        if (rpcError) {
            throw new Error(rpcError.message);
        }

        return order;
    },

    getOrderById: async function (id: string) {
        const { data, error } = await supabaseClient
            .from("orders")
            .select(`
            *,
            user:profiles (
                id,
                full_name,
                email,
                phone
            ),
            items:order_items (
                id,
                book_id,
                quantity,
                price_at_purchase,
                book:books (
                    id,
                    title_ar,
                    title_en,
                    price,
                    cover_image,
                    stock
                )
            )
        `)
            .eq("id", id)
            .single();

        if (error) throw new Error(error.message);

        const formattedOrder: Order = {
            ...data,
            user: data.user || null,
            shipping_details: {
                country: data.country,
                state: data.state_province,
                city: data.city,
                street_address: data.shipping_address,
                postal_code: data.postal_code,
            },
            customer_name: data.user?.name || data.customer_name,
            customer_email: data.user?.email || data.customer_email,
            customer_phone: data.user?.phone || data.customer_phone,
            items: data.items || []
        };

        return formattedOrder;
    },

    getOrders: async function (params?: OrderParams) {
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabaseClient
            .from("orders")
            .select(`
                *,
                user:profiles (id, full_name, email, phone),
                items:order_items (id, quantity, price_at_purchase)
            `, { count: 'exact' });

        query = query.eq("user_id", params?.userId)

        if (params?.search) {
            const searchTerm = `%${params.search}%`;

            query = query.or(
                `customer_name.ilike.${searchTerm},` +
                `customer_email.ilike.${searchTerm},` +
                `customer_phone.ilike.${searchTerm}`
            );

            if (!isNaN(Number(params.search))) {
                query = query.or(`order_number.eq.${params.search}`);
            }
        }

        if (params?.startDate) {
            query = query.gte("created_at", params.startDate);
        }
        if (params?.endDate) {
            query = query.lte("created_at", params.endDate);
        }

        if (params?.status && params.status !== 'all') {
            query = query.eq("status", params.status);
        }

        // 4. الترتيب (Sorting)
        switch (params?.sortBy) {
            case "oldest":
                query = query.order("created_at", { ascending: true });
                break;
            case "total_desc":
                query = query.order("total_amount", { ascending: false });
                break;
            case "total_asc":
                query = query.order("total_amount", { ascending: true });
                break;
            case "status":
                query = query.order("status", { ascending: true })
                    .order("created_at", { ascending: false });
                break;
            case "newest":
            default:
                query = query.order("created_at", { ascending: false });
                break;
        }

        query = query.order("id", { ascending: false });

        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw new Error(error.message);

        const formattedData: Order[] = (data || []).map(order => ({
            ...order,
            shipping_details: {
                country: order.country,
                state: order.state_province,
                city: order.city,
                street_address: order.shipping_address,
                postal_code: order.postal_code,
            }
        }));

        return {
            items: formattedData,
            total: count || 0,
        };
    }
};