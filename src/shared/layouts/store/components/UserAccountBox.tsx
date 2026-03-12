"use client";

import { User, LogOut, Settings } from "lucide-react";

import { useAuthActions, useAuthState } from "@/features/auth/hooks";
import { Link } from "@/i18n/routing";
import { useAppTranslation } from "@/shared/hooks";

export const UserAccountBox = () => {
    const { t } = useAppTranslation("common");

    const { isAuthenticated, user } = useAuthState()
    const { logout } = useAuthActions()

    if (!isAuthenticated) {
        return (
            <Link
                href="/login"
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors flex items-center justify-center"
                title={t("common.login")}
            >
                <User size={22} />
            </Link>
        );
    }

    return (
        <div className="relative group">
            <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <User size={16} className="text-primary" />
                </div>
            </button>

            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                <div className="px-4 py-2 border-b dark:border-zinc-800 mb-2">
                    <p className="text-sm font-bold truncate">{user?.full_name || "User Name"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>

                <Link
                    href="/account/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                >
                    <Settings size={16} />
                    {t("common.my_profile")}
                </Link>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors mt-2 border-t dark:border-zinc-800"
                >
                    <LogOut size={16} />
                    {t("common.logout")}
                </button>
            </div>
        </div>
    );
};