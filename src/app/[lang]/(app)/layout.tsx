import { notFound } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";

/**
 * Account, sign-in, admin and privacy pages are English only for now, at their
 * usual URLs (/login, /account). Other languages link to them as they are.
 */
export default async function EnglishOnlyLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  if ((await params).lang !== DEFAULT_LOCALE) notFound();
  return children;
}
