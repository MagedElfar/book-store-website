"use client";

import { ReactNode } from "react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { ThemeProvider } from "./ThemeProvider";
import { SupportedLang } from "@/shared/types";
import { ReactQueryProvider } from "./ReactQueryProvider";

interface ProvidersProps {
    children: ReactNode;
    locale: SupportedLang;
    messages: AbstractIntlMessages;
}

export function AppProvider({ children, locale, messages }: ProvidersProps) {
    return (
        <NextIntlClientProvider timeZone="Africa/Cairo" locale={locale} messages={messages}>
            <ReactQueryProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </ReactQueryProvider>
        </NextIntlClientProvider>
    );
}