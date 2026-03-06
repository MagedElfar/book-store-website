"use client";

import { ReactNode } from "react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { ThemeProvider } from "./ThemeProvider";
import { SupportedLang } from "@/shared/types";

interface ProvidersProps {
    children: ReactNode;
    locale: SupportedLang;
    messages: AbstractIntlMessages;
}

export function AppProvider({ children, locale, messages }: ProvidersProps) {
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </NextIntlClientProvider>
    );
}