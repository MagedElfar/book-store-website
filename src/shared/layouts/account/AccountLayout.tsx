"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";

import { ACCOUNT_NAVIGATION } from "./constants";

export function AccountLayout({ children }: { children: React.ReactNode }) {
    const { t } = useAppTranslation("account");
    const pathname = usePathname();

    return (
        <div className="bg-zinc-50/50 dark:bg-zinc-950/50  md:min-h-[calc(100vh-128px)]">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

                    <aside className="md:col-span-4 lg:col-span-3">
                        <div className="md:sticky md:top-36 space-y-4">
                            <div className="px-4 mb-2 md:mb-6 hidden md:block">
                                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                    {t("myAccount")}
                                </h1>
                                <p className="text-sm text-zinc-500 mt-1">
                                    {t("manageAccountSubtitle")}
                                </p>
                            </div>

                            <nav className={cn(
                                "flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 no-scrollbar items-center md:items-stretch",
                                "px-1 md:px-0"
                            )}>
                                {ACCOUNT_NAVIGATION.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href || pathname.endsWith(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-medium transition-all whitespace-nowrap md:whitespace-normal shrink-0 md:shrink",
                                                isActive
                                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-2 ring-primary/20"
                                                    : "bg-white dark:bg-zinc-900 md:bg-transparent md:dark:bg-transparent text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800 md:border-none"
                                            )}
                                        >
                                            <Icon size={18} className="shrink-0" />
                                            {t(item.label as any)}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    <div className="md:col-span-8 lg:col-span-9 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-7 shadow-sm min-h-[400px] md:min-h-[600px]">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
}