import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { useCartTotal } from '@/features/cart/hooks/useCartTotal';
import { useRouter } from '@/i18n/routing';
import { Separator } from '@/shared/components/shadcn/separator';
import { SHIPPING_FEE, VAT_FEE } from '@/shared/config/constants';
import { paths } from '@/shared/config/paths';
import { FormContainer } from '@/shared/form/components/layout/FormContainer';
import { AppFormProvider } from '@/shared/form/providers/AppFormProvider';
import { useAppTranslation } from '@/shared/hooks/use-translation';
import { errorMapper } from '@/shared/utils/error';
import { useCartStore } from '@/store/use-cart-store';

import { CustomerInfoStep } from '../components/CustomerInfoStep';
import { OrderItemsReview, ReviewItem } from '../components/OrderItemsReview';
import { OrderSummaryCard } from '../components/OrderSummaryCard';
import { PaymentAndReviewStep } from '../components/PaymentAndReviewStep';
import { ShippingAddressSection } from '../components/ShippingAddressSection';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { type CreateOrderFormSchemaType, CreateOrderFormSchema } from '../schema/CreateOrderFormSchema';
import { CreateOrderRequest } from '../types/request';

export function CreateOrderForm() {
    const { t, getLocalizedValue } = useAppTranslation("order");
    const { user } = useAuthState()
    const router = useRouter();
    const { mutateAsync: createOrder } = useCreateOrder();
    const items = useCartStore(s => s.items);
    const clearCart = useCartStore(s => s.clearCart);
    const subtotal = useCartTotal()

    const shippingCost = SHIPPING_FEE;
    const vatCost = subtotal * VAT_FEE;
    const finalTotal = vatCost + subtotal + Number(shippingCost);

    const itemsReview: ReviewItem[] = useMemo(() => items.map((item) => ({
        id: item.bookId,
        name: getLocalizedValue(item.book, "title"),
        quantity: item.quantity,
        price: item.book?.sale_price || item.book.price,
        image: item.book.cover_image || "/images/img-ph.jpg"
    })), [getLocalizedValue, items])

    const defaultValues: Partial<CreateOrderFormSchemaType> = {
        user_id: user?.id,
        customer_name: user?.full_name || "",
        customer_email: user?.email || "",
        customer_phone: user?.phone || "",
        payment_method: "cod",
        items: [],
        shipping_details: {
            country: "",
            city: "",
            street_address: "",
        }
    };

    const methods = useForm<CreateOrderFormSchemaType>({
        resolver: zodResolver(CreateOrderFormSchema(t)),
        defaultValues
    });

    const { setValue } = methods

    const onsubmit = async (data: CreateOrderFormSchemaType) => {
        try {
            const order = await createOrder(data as CreateOrderRequest);
            toast.success(t("feedback.successSave"));
            await clearCart(user?.id)
            router.push(paths.checkoutSuccess(order?.order_number));
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    useEffect(() => {
        setValue("items", items.map(item => ({
            bookId: item.bookId,
            quantity: item.quantity,
            price: item.book?.sale_price ? item.book.sale_price : item.book.price
        })))
    }, [items, setValue])

    return (
        <AppFormProvider<CreateOrderFormSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                submitText={t("actions.createOrder")}
                contentClassName='items-center'
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-6">
                        <CustomerInfoStep />
                        <ShippingAddressSection />
                        <PaymentAndReviewStep />
                    </div>
                    <aside className="lg:col-span-4 lg:sticky lg:top-40 space-y-6">
                        <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
                                <h3 className="font-bold text-lg">{t("summary.title")}</h3>
                            </div>

                            <div className="p-5 space-y-6">
                                <OrderItemsReview
                                    items={itemsReview}
                                    maxHeight="max-h-[400px]"
                                    className="border-0  p-0 shadow-none bg-transparent"
                                />

                                <Separator />

                                <OrderSummaryCard
                                    subtotal={subtotal}
                                    shippingCost={shippingCost}
                                    vatCost={vatCost}
                                    finalTotal={finalTotal}
                                />

                            </div>
                        </div>
                    </aside>
                </div>
            </FormContainer>
        </AppFormProvider>
    );
}