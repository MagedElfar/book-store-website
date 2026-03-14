
import { Metadata } from 'next';

import { AddressesView } from '@/features/addresses/views/AddressesView'
import { getAppTranslation } from '@/shared/lib/getTranslations';

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getAppTranslation("addresses");

    return {
        title: t("myAddress"),
        robots: {
            index: false,
            follow: false,
        }
    };
}

export default function AddressesPage() {
    return (
        <>
            <AddressesView />
        </>
    )
}
