import { getCategories } from "@/features/categories";
import { StoreLayout } from "@/shared/layouts";
import { getAppTranslation } from "@/shared/lib";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getAppTranslation("common");

    return {
        title: {
            template: `%s | ${t("nav.menuTitle")}`,
            default: t("nav.menuTitle"),
        },
        description: t("footer.description"),
        metadataBase: new URL("https://your-domain.com"),
        alternates: {
            canonical: "/",
        },
        openGraph: {
            type: "website",
            siteName: t("nav.menuTitle"),
        },
    };
}

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