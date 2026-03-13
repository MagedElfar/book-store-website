
import { ChangePasswordForm } from '@/features/account/forms/ChangePasswordForm'
import { EmailForm } from '@/features/account/forms/EmailForm'
import { Separator } from '@/shared/components/shadcn/separator'
import { getAppTranslation } from '@/shared/lib/getTranslations'


export default async function AccountPage() {
    const { t } = await getAppTranslation("account")
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
