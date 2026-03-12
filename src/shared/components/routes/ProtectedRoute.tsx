"use client";

import { useContext, type ReactNode } from "react";

import { AuthStateContext } from "@/features/auth/context/AuthStateContext";
import { redirect } from "@/i18n/routing";
import { paths } from "@/shared/config/paths";
import { useAppTranslation } from "@/shared/hooks/use-translation";

import { SplashScreen } from "../feedback/SplashScreen";

interface Props {
    redirectTo?: string;
    children: ReactNode;
}

export function ProtectedRoute({ redirectTo = paths.auth.login, children }: Props) {
    const authState = useContext(AuthStateContext);
    const { lang } = useAppTranslation()

    if (authState?.isLoading) {
        return (
            <div className="w-full h-screen">
                <SplashScreen withLogo />
            </div>
        );
    }

    if (!authState?.isAuthenticated) {
        redirect({ href: redirectTo, locale: lang });
        return null;
    }

    return <>{children}</>;
}