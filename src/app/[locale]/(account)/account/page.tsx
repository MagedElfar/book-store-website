
import { MyAccountForm } from '@/features/account/forms/MyAccountForm'
import { getAppTranslation } from '@/shared/lib/getTranslations'


export default async function AccountPage() {
    const { t } = await getAppTranslation("account")
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
