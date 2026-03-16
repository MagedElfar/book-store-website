import { Metadata } from "next";

import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeader } from "@/shared/components/layout/SectionHeader";
import { getAppTranslation } from "@/shared/lib/getTranslations";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const { t } = await getAppTranslation(locale, "common");

    return {
        title: t("about.title"),
        description: t("about.description"),
    };
}

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    const { t } = await getAppTranslation(locale, "common");

    return (
        <PageLayout>
            <SectionHeader
                title={t("about.title")}
                description={t("about.description")}
            />

            <div className="max-w-4xl mx-auto space-y-12 py-12 px-4">
                <section>
                    <h2 className="text-2xl font-bold mb-4">{t("about.story_title")}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {t("about.story_content")}
                    </p>
                </section>

                <section className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 border rounded-2xl bg-card">
                        <h3 className="font-bold text-lg mb-2">{t("about.mission_title")}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {t("about.mission_content")}
                        </p>
                    </div>
                    <div className="p-6 border rounded-2xl bg-card">
                        <h3 className="font-bold text-lg mb-2">{t("about.values_title")}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {t("about.values_content")}
                        </p>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}