import fs from "node:fs";
import type { NextConfig } from "next";

// Languages come from content/locales.json. Pages live under src/app/[lang]/;
// English keeps its unprefixed URLs by rewriting /bc to /en/bc internally, and
// /en/... itself redirects to the unprefixed URL so each page has one address.
const locales = JSON.parse(fs.readFileSync("content/locales.json", "utf8")) as Record<
  string,
  { default?: boolean }
>;
const defaultLocale = Object.keys(locales).find((l) => locales[l].default)!;
// Paths that are not English pages: other languages, API routes, Next's own
// files, and any file with an extension (sitemap.xml, icons, screenshots).
const notPages = [...Object.keys(locales), "api", "_next", "_vercel"].join("|");

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: `/${defaultLocale}` },
        {
          source: `/:path((?!(?:${notPages})(?:/|$))(?!.*\\.[A-Za-z0-9]+$).+)`,
          destination: `/${defaultLocale}/:path`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      { source: `/${defaultLocale}`, destination: "/", permanent: true },
      { source: `/${defaultLocale}/:path*`, destination: "/:path*", permanent: true },
      // Before regions existed, BC steps lived at /steps/<slug>.
      {
        source: "/steps/:slug",
        destination: "/bc/steps/:slug",
        permanent: true,
      },
      // The IP address guide was two steps before it became one page.
      {
        source: "/topics/ip-address/steps/:slug",
        destination: "/topics/ip-address",
        permanent: true,
      },
      {
        source: `/:lang(${Object.keys(locales).filter((l) => l !== defaultLocale).join("|")})/topics/ip-address/steps/:slug`,
        destination: "/:lang/topics/ip-address",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
