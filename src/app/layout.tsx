import { siteDescription } from "@/lib/regions";
import { SITE_NAME, SITE_URL, siteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist } from "next/font/google";
import { AuthNav } from "@/components/AuthNav";
import { FooterGuides } from "@/components/FooterGuides";
import { InstallPrompt } from "@/components/InstallPrompt";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const defaultTitle = "LaunchList: Step-by-step business and help guides";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: defaultTitle, template: `%s | ${SITE_NAME}` },
  description: siteDescription(),
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    title: defaultTitle,
    description: siteDescription(),
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription(),
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={siteJsonLd(siteDescription())} />
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
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
        <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:text-neutral-400 dark:border-neutral-800">
          <FooterGuides />
          General guidance, not legal or accounting advice. Rules and fees
          change, so confirm details on each official site.{" "}
          <Link href="/privacy" className="underline">
            Privacy
          </Link>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
