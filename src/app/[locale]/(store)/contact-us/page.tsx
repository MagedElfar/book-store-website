import { Metadata } from "next";

import { PageLayout } from "@/shared/components/layout/PageLayout";
import { SectionHeader } from "@/shared/components/layout/SectionHeader";
import { Button } from "@/shared/components/shadcn/button";
import { Input } from "@/shared/components/shadcn/input";
import { Textarea } from "@/shared/components/shadcn/textarea";
import { getAppTranslation } from "@/shared/lib/getTranslations";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const { t } = await getAppTranslation(locale, "common");

    return {
        title: t("contact.title"),
        description: t("contact.description"),
    };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    const { t } = await getAppTranslation(locale, "common");

    return (
        <PageLayout>
            <SectionHeader
                title={t("contact.title")}
                description={t("contact.description")}
            />

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 py-16 px-4">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">{t("contact.get_in_touch")}</h3>
                        <p className="text-muted-foreground">
                            {t("contact.contact_info_desc")}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                            <span className="text-xl">📍</span>
                            <span className="text-sm">{t("contact.info.address")}</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                            <span className="text-xl">📧</span>
                            <span className="text-sm">{t("contact.info.email")}</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                            <span className="text-xl">📞</span>
                            <span className="text-sm">{t("contact.info.phone")}</span>
                        </div>
                    </div>
                </div>

                {/* Placeholder Form */}
                <div className="p-8 border rounded-3xl shadow-sm space-y-6 bg-card">
                    <div className="grid grid-cols-2 gap-4">
                        <Input placeholder={t("contact.form.first_name")} />
                        <Input placeholder={t("contact.form.last_name")} />
                    </div>
                    <Input placeholder={t("contact.form.email")} type="email" />
                    <Textarea
                        placeholder={t("contact.form.message")}
                        className="min-h-[150px] resize-none"
                    />
                    <Button className="w-full size-lg text-md font-semibold transition-all hover:scale-[1.01]">
                        {t("contact.form.submit")}
                    </Button>
                </div>
            </div>
        </PageLayout>
    );
}