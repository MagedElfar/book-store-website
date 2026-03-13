"use client";

import { User, LogOut, Settings } from "lucide-react";

import { useAuthActions } from "@/features/auth/hooks/useAuthActions";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { Link } from "@/i18n/routing";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/shadcn/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/shadcn/dropdown-menu";
import { Skeleton } from "@/shared/components/shadcn/skeleton";
import { paths } from "@/shared/config/paths";
import { useAppTranslation } from "@/shared/hooks/use-translation";

export const UserAccountBox = () => {
    const { t, dir } = useAppTranslation("common");
    const { isAuthenticated, user, isLoading } = useAuthState();
    const { logout } = useAuthActions();

    if (isLoading) {
        return (
            <div className="p-2.5">
                <Skeleton className="w-8 h-8 rounded-full" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Link
                href={paths.auth.login}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors flex items-center justify-center"
                title={t("common.login")}
            >
                <User size={22} />
            </Link>
        );
    }

    return (
        <DropdownMenu dir={dir}>
            <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors flex items-center gap-2 outline-none group">
                    <Avatar className="w-9 h-9 border group-hover:border-primary transition-all">
                        <AvatarImage src={user?.avatar_url || undefined} alt={user?.full_name} />
                        <AvatarFallback className="bg-primary/5">
                            <User size={18} className="text-primary" />
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none truncate">
                            {user?.full_name || "User Name"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={paths.account.root} className="cursor-pointer w-full flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>{t("common.my_profile")}</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => logout()}
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("common.logout")}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};