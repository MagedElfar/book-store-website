"use client";

import { Fragment, useMemo } from "react";
import { paths } from "@/shared/config/paths";
import { cn } from "@/lib/utils";
import { useAppTranslation } from "@/shared/hooks";
import { NavLink } from "../components";

interface NavItemsProps {
    categories: any[];
    isMobile?: boolean;
    onClick?: () => void;
}

export const NavItems = ({ categories, isMobile, onClick }: NavItemsProps) => {
    const { t, getLocalizedValue } = useAppTranslation("common")

    const navLinks = [
        {
            href: paths.home,
            text: t("nav.home"),
            onClick: onClick,
            isMobile
        },
        {
            href: paths.categories.root,
            text: t("nav.allCategories"),
            onClick: onClick,
            isMobile
        },
        ...categories.map(cat => ({
            href: paths.categories.details(cat.slug),
            text: getLocalizedValue(cat, "name"),
            onClick: onClick,
            isMobile
        })),
        {
            href: paths.aboutUs,
            text: t("nav.aboutUs"),
            onClick: onClick,
            isMobile
        },
        {
            href: paths.contactUs,
            text: t("nav.contactUs"),
            onClick: onClick,
            isMobile
        },
    ];

    return (
        <nav className={cn(
            "flex items-center gap-1",
            isMobile ? "flex-col items-stretch w-full gap-3 pt-4" : "flex-row h-full"
        )}>

            {navLinks.map((item, index) => <Fragment key={item.href}>
                <NavLink
                    href={item.href}
                    text={item.text}
                    isMobile={item.isMobile}
                    onClick={item?.onClick}
                />
                {index < navLinks.length - 1 && <span className="hidden md:block text-orange-200/50 dark:text-orange-900/50">|</span>}
            </Fragment>)}
        </nav>
    );
};