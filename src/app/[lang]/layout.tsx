import { getLocalizedCoverage, siteDescription } from "@/lib/regions";
import { SITE_NAME, SITE_URL, siteJsonLd } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionary";
import { DEFAULT_LOCALE, isLocale, localePath, localeTag, locales } from "@/lib/i18n/locales";
import { getLocalizedTopics } from "@/lib/topics";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocaleProvider } from "@/components/LocaleProvider";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist } from "next/font/google";
import { AuthNav } from "@/components/AuthNav";
import { SiteFooter } from "@/components/SiteFooter";
import { InstallPrompt } from "@/components/InstallPrompt";
import { ThemeToggle } from "@/components/ThemeToggle";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const dynamicParams = false;

/**
 * Every language has its own root layout render (and <html lang>). English is
 * served at unprefixed URLs: next.config.ts rewrites /bc to /en/bc internally.
 */
export function generateStaticParams() {
  return locales().map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  const description = siteDescription(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.site.title, template: `%s | ${SITE_NAME}` },
    description,
    applicationName: SITE_NAME,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: localeTag(locale, "CA").replace("-", "_"),
      title: t.site.title,
      description,
    },
    twitter: { card: "summary_large_image", title: t.site.title, description },
  };
}

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default async function RootLayout({ children, modal, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  // Guides each language has in full, for the language switcher.
  const available = Object.fromEntries(
    locales().map((l) => [
      l,
      [
        ...getLocalizedCoverage(l).flatMap((c) => c.regions.filter((r) => r.available).map((r) => r.slug)),
        ...getLocalizedTopics(l).map((topic) => topic.slug),
      ],
    ]),
  );
  return (
    <html
      lang={lang === DEFAULT_LOCALE ? "en" : localeTag(lang)}
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={lang}>
        <JsonLd data={siteJsonLd(siteDescription(lang), lang)} />
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
            <Link href={localePath(lang, "/")} className="flex items-center gap-2 font-semibold">
              <Image
                src="/logo.svg"
                alt=""
                width={28}
                height={28}
                unoptimized
              />
              LaunchList
            </Link>
            <div className="flex items-center gap-3">
              <LanguageSwitcher available={available} />
              <ThemeToggle />
              <AuthNav />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
          {children}
        </main>
        {modal}
        <InstallPrompt />
        <SiteFooter locale={lang} />
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
