import React from "react";


import { useAppTranslation } from "@/shared/hooks/use-translation";

import { ErrorRedirect } from "./ErrorRedirect";

interface Props {
    error?: Error;
    reset?: () => void;
}

export const ErrorFallback: React.FC<Props> = ({ error, reset }) => {
    const { t } = useAppTranslation("common");

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-background">
            <ErrorRedirect
                title={t("errorFallback.title")}
                content={error?.message || t("errorFallback.message")}
                btnText={t("errorFallback.reload")}
                rest={reset}
            />
        </div>
    );
};