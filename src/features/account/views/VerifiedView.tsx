"use client"

import { useMemo } from "react";

import { ErrorRedirect } from "@/shared/components/feedback/ErrorRedirect";
import { SuccessRedirect } from "@/shared/components/feedback/SuccessRedirect";
import { paths } from "@/shared/config/paths";
import { useAppTranslation } from "@/shared/hooks/use-translation";

interface VerifiedPageProps {
    rootPath?: string;
}

export function VerifiedView({
    rootPath = paths.account.root,
}: VerifiedPageProps) {
    const { t } = useAppTranslation("account");


    const errorMessage = useMemo(() => {
        if (typeof window === "undefined") return null;

        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const error = params.get("error");
        const errorDescription = params.get("error_description");

        if (error) {
            return decodeURIComponent(
                errorDescription || t("verified.errorContent")
            );
        }

        return null;
    }, [t]);

    return (
        <>
            {
                errorMessage ?
                    <ErrorRedirect
                        title={t("verified.errorTitle")}
                        content={errorMessage}
                        btnText={t("verified.errorBtn")}
                        redirectPath={paths.account.root}
                    />
                    :
                    <SuccessRedirect
                        title={t("verified.title")}
                        content={t("verified.content")}
                        btnText={t("verified.btn")}
                        redirectPath={rootPath}
                    />
            }
        </>

    );
};

