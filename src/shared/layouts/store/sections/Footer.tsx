"use client";

import { Link } from "@/i18n/routing";
import { useAppTranslation } from "@/shared/hooks";
import {
    Mail,
    Phone,
    MapPin,
    ArrowUpRight
} from "lucide-react";
import { Logo } from "../../common";
import { paths } from "@/shared/config";

export const Footer = () => {
    const { t } = useAppTranslation("common");
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-900 pt-16 pb-8 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="space-y-6">
                        <Logo />
                        <p className="text-slate-600 dark:text-zinc-400 leading-relaxed max-w-xs text-sm md:text-base">
                            {t("footer.description")}
                        </p>
                        <div className="flex items-center gap-3">
                            <SocialLink
                                href="#"
                                icon={<FacebookIcon />}
                                hoverClass="hover:bg-[#1877F2]"
                            />
                            <SocialLink
                                href="#"
                                icon={<InstagramIcon />}
                                hoverClass="hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
                            />
                            <SocialLink
                                href="#"
                                icon={<TwitterIcon />}
                                hoverClass="hover:bg-black"
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">
                            {t("footer.quickLinks")}
                        </h4>
                        <ul className="space-y-4">
                            <FooterLink href={paths.books.root}>{t("footer.allBooks")}</FooterLink>
                            <FooterLink href={paths.offers}>{t("footer.offers")}</FooterLink>
                            <FooterLink href={paths.authors.root}>{t("footer.authors")}</FooterLink>
                            <FooterLink href={paths.categories.root}>{t("footer.categories")}</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">
                            {t("footer.support")}
                        </h4>
                        <ul className="space-y-4">
                            <FooterLink href={paths.aboutUs}>{t("footer.about")}</FooterLink>
                            <FooterLink href={paths.contactUs}>{t("footer.contactUs")}</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">
                            {t("footer.contact")}
                        </h4>
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

                <div className="pt-8 border-t border-slate-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium">
                        © {currentYear} {t("footer.copyRight")}
                    </p>

                    <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-[0.2em]">
                        <span className="hover:text-slate-600 dark:hover:text-zinc-400 transition-colors cursor-default">Visa</span>
                        <span className="hover:text-slate-600 dark:hover:text-zinc-400 transition-colors cursor-default">Mastercard</span>
                        <span className="hover:text-slate-600 dark:hover:text-zinc-400 transition-colors cursor-default">Cash on Delivery</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};


const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
        <Link
            href={href}
            className="group flex items-center gap-1 text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-200"
        >
            <span className="text-sm md:text-base">{children}</span>
            <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </Link>
    </li>
);

const SocialLink = ({ icon, href, hoverClass }: { icon: React.ReactNode; href: string; hoverClass: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:text-white hover:-translate-y-1 ${hoverClass}`}
    >
        {icon}
    </a>
);

const ContactItem = ({ icon, label, value }: { icon: React.ReactNode; label: string, value: string }) => (
    <div className="flex gap-4 items-start group">
        <div className="mt-1 w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-slate-200 dark:border-zinc-800 shadow-sm group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-zinc-500 font-bold mb-0.5">{label}</p>
            <p className="text-sm text-slate-700 dark:text-zinc-300 font-semibold">{value}</p>
        </div>
    </div>
);

const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const TwitterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);