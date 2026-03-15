
import { getCategories } from "@/features/categories/api/get";
import { ProtectedRoute } from "@/shared/components/routes/ProtectedRoute";
import { AccountLayout } from "@/shared/layouts/account/AccountLayout";
import { StoreLayout } from "@/shared/layouts/store/StoreLayout";
import { getAppTranslation } from "@/shared/lib/getTranslations";

export default async function Layout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {

    const { locale } = await params
    const { lang } = await getAppTranslation(locale);

    const { items: navCategories } = await getCategories({
        is_in_nav: true,
        limit: 10,
        lang,
        sortBy: 'alpha'
    });


    return <ProtectedRoute>
        <StoreLayout navCategories={navCategories} >
            <AccountLayout>
                {children}
            </AccountLayout>
        </StoreLayout>
    </ProtectedRoute>

}