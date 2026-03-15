
import { Metadata } from 'next';

import { ChangePasswordForm } from '@/features/account/forms/ChangePasswordForm'
import { EmailForm } from '@/features/account/forms/EmailForm'
import { Separator } from '@/shared/components/shadcn/separator'
import { getAppTranslation } from '@/shared/lib/getTranslations'

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const { t } = await getAppTranslation(locale, "account");

    return {
        title: t("settings"),
        robots: {
            index: false,
            follow: false,
        }
    };
}

export default async function SettingsPage({ params }: Props) {
    const { locale } = await params
    const { t } = await getAppTranslation(locale, "account");
    return (
        <div className='w-full space-y-8'>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {t("settings")}
            </h2>
            <Separator />
            <EmailForm />
            <Separator />
            <ChangePasswordForm />
        </div>
    )
}
