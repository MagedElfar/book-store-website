"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface NavLinkProps {
    href: string;
    text: string;
    isMobile?: boolean;
    onClick?: () => void;
}

export const NavLink = ({ href, text, isMobile, onClick }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "relative transition-all duration-300 whitespace-nowrap flex items-center",
                !isMobile && "px-3 py-2 text-sm font-medium hover:text-white dark:hover:text-orange-300",
                isMobile && "w-full px-4 py-3 text-base rounded-xl border-r-4",

                isActive
                    ? isMobile
                        ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-r-orange-500 font-bold"
                        : "text-white dark:text-orange-400"
                    : isMobile
                        ? "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 border-r-transparent"
                        : "text-white/60 dark:text-orange-200/50"
            )}
        >
            {text}
            {isActive && !isMobile && (
                <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-current rounded-full" />
            )}
        </Link>
    );
};