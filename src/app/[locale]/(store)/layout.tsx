import { getCategories } from "@/features/categories/api/get";
import { routing } from "@/i18n/routing";
import { StoreLayout } from "@/shared/layouts/store/StoreLayout";
import { getAppTranslation } from "@/shared/lib/getTranslations";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
interface Props {
    params: Promise<{ locale: string }>
    children: React.ReactNode
}


export default async function Layout({ children, params }: Props) {

    const { locale } = await params

    const { lang } = await getAppTranslation(locale);

    const { items: navCategories } = await getCategories({
        is_in_nav: true,
        limit: 10,
        lang,
        sortBy: 'alpha'
    });


    return <StoreLayout navCategories={navCategories} >{children}</StoreLayout>;
}