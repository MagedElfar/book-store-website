
import { Metadata } from 'next';

import { AddressesView } from '@/features/addresses/views/AddressesView'
import { getAppTranslation } from '@/shared/lib/getTranslations';

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params

    const { t } = await getAppTranslation(locale, "addresses");

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
