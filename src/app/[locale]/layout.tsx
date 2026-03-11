import type { Metadata } from "next";
import { Geist, Cairo } from "next/font/google";
import { getMessages } from "next-intl/server";

import "./../globals.css";
import { AppProvider } from "@/providers";
import { getAppTranslation } from "@/shared/lib/getTranslations";
import { SupportedLang } from "@/shared/types";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getAppTranslation("common");

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
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const { dir } = await getAppTranslation();
  const messages = await getMessages();

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
        <AppProvider locale={locale as SupportedLang} messages={messages}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}