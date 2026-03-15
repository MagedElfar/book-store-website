import type { Metadata } from "next";
import { Geist, Cairo } from "next/font/google";
import { getMessages } from "next-intl/server";
import "./../globals.css";
import NextTopLoader from 'nextjs-toploader';
import { ReactNode } from "react";

import { AppProvider } from "@/providers/AppProvider";
import { getAppTranslation } from "@/shared/lib/getTranslations";
import { SupportedLang } from "@/shared/types/common";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

interface Props {
  children: ReactNode,
  params: Promise<{ locale: string }>
}


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});




export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const { t } = await getAppTranslation(
    locale,
    "common");

  return {
    title: {
      template: `%s | ${t("nav.menuTitle")}`,
      default: t("nav.menuTitle"),
    },
    description: t("footer.description"),
    metadataBase: new URL("https://your-domain.com"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      siteName: t("nav.menuTitle"),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;


  const messages = await getMessages({ locale: locale as any });
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
    >
      <body
        className={`
          ${locale === "ar" ? cairo.variable : geistSans.variable} 
          min-h-screen bg-background antialiased
          font-sans 
        `}
      >
        <NextTopLoader
          color="var(--loader-color)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="none"
        />
        <AppProvider locale={locale as SupportedLang} messages={messages}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}