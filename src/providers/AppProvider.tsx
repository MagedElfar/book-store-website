"use client";

import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { ReactNode } from "react";


import { SupportedLang } from "@/shared/types";

import { ReactQueryProvider } from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";

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