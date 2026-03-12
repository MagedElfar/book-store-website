import { getCategories } from "@/features/categories/api/get";
import { StoreLayout } from "@/shared/layouts/store/StoreLayout";
import { getAppTranslation } from "@/shared/lib/getTranslations";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const { lang } = await getAppTranslation();

    const { items: navCategories } = await getCategories({
        is_in_nav: true,
        limit: 10,
        lang,
        sortBy: 'alpha'
    });


    return <StoreLayout navCategories={navCategories} >{children}</StoreLayout>;
}