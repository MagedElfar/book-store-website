
import { Metadata } from 'next';

import { MyAccountForm } from '@/features/account/forms/MyAccountForm'
import { getAppTranslation } from '@/shared/lib/getTranslations'

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params

    const { t } = await getAppTranslation(locale, "account");

    return {
        title: t("myAccount"),
        description: t("manageAccountSubtitle"),
        robots: {
            index: false,
            follow: false,
        }
    };
}

export default async function AccountPage({ params }: Props) {
    const { locale } = await params
    const { t } = await getAppTranslation(locale, "account")
    return (
        <>
            <div className="w-full mb-8 space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {t("myAccount")}
                </h2>
                <div className="h-px w-full bg-border mt-4" /> {/* خط فاصل ناعم */}
            </div>
            <MyAccountForm />
        </>
    )
}
