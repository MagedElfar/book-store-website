
import { Metadata } from 'next';

import { OrdersView } from '@/features/orders/views/OrdersView'
import { getAppTranslation } from '@/shared/lib/getTranslations';

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getAppTranslation("order");

    return {
        title: t("myOrders"),
        robots: {
            index: false,
            follow: false,
        }
    };
}

export default function OrdersPage() {
    return (
        <>
            <OrdersView />
        </>
    )
}
