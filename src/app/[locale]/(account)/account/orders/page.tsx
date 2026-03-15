
import { Metadata } from 'next';

import { OrdersView } from '@/features/orders/views/OrdersView'
import { getAppTranslation } from '@/shared/lib/getTranslations';

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params

    const { t } = await getAppTranslation(locale, "order");

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
