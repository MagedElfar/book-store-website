"use client";

import { Link } from "@/i18n/routing";
import { useAppTranslation } from "@/shared/hooks";
import {
    Facebook,
    Instagram,
    Twitter,
    Mail,
    Phone,
    MapPin,
    BookOpen,
    ArrowUpRight
} from "lucide-react";
import { Logo } from "../../common";
import path from "path";
import { paths } from "@/shared/config";

export const Footer = () => {
    const { t } = useAppTranslation("common");
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* العمود الأول: الشعار والوصف */}
                    <div className="space-y-6">
                        <Logo />
                        <p className="text-gray-500 dark:text-zinc-400 leading-relaxed max-w-xs text-sm md:text-base">
                            {t("footer.description")}
                        </p>
                        <div className="flex items-center gap-3">
                            <SocialLink icon={<Facebook size={18} />} href="#" />
                            <SocialLink icon={<Instagram size={18} />} href="#" />
                            <SocialLink icon={<Twitter size={18} />} href="#" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 dark:text-white">{t("footer.quickLinks")}</h4>
                        <ul className="space-y-4">
                            <FooterLink href={paths.books.root}>{t("footer.allBooks")}</FooterLink>
                            <FooterLink href={paths.authors.root}>{t("footer.authors")}</FooterLink>
                            <FooterLink href={paths.categories.root}>{t("footer.categories")}</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 dark:text-white">{t("footer.support")}</h4>
                        <ul className="space-y-4">
                            <FooterLink href={paths.aboutUs}>{t("footer.about")}</FooterLink>
                            <FooterLink href={paths.contactUs}>{t("footer.contactUs")}</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 dark:text-white">{t("footer.contact")}</h4>
                        <div className="space-y-4">
                            <ContactItem
                                icon={<Phone size={18} />}
                                label={t("footer.phone")}
                                value="+20 123 456 789"
                            />
                            <ContactItem
                                icon={<Mail size={18} />}
                                label={t("footer.email")}
                                value="hello@bookly.com"
                            />
                            <ContactItem
                                icon={<MapPin size={18} />}
                                label={t("footer.address")}
                                value={t("footer.addressValue")}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 dark:text-zinc-500 text-center">
                        © {currentYear} {t("footer.copyRight")}
                    </p>
                    <div className="flex items-center gap-6 text-xs font-medium text-gray-400 dark:text-zinc-600 uppercase tracking-widest">
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>Cash on Delivery</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// مكونات مساعدة (Helper Components) داخلياً
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
        <Link
            href={href}
            className="group flex items-center gap-1 text-gray-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
        >
            <span>{children}</span>
            <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
        </Link>
    </li>
);

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
    <a
        href={href}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
    >
        {icon}
    </a>
);

const ContactItem = ({ icon, label, value }: { icon: React.ReactNode; label: string, value: string }) => (
    <div className="flex gap-4 items-start">
        <div className="mt-1 w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            {icon}
        </div>
        <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-bold">{label}</p>
            <p className="text-sm text-gray-600 dark:text-zinc-300 font-medium">{value}</p>
        </div>
    </div>
);