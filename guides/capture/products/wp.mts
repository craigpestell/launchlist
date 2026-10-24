import type { Page } from "playwright";

/** The wp-harness demo site from the Variation Converter repo (harness/wp-harness up). */
export const WP_URL = process.env.WP_URL ?? "http://localhost:8080";

export async function login(page: Page) {
  await page.goto(`${WP_URL}/wp-login.php`);
  await page.fill("#user_login", process.env.WP_USER ?? "admin");
  await page.fill("#user_pass", process.env.WP_PASS ?? "admin");
  await Promise.all([page.waitForURL(/wp-admin/), page.click("#wp-submit")]);
}

export const admin = (page: Page, query: string) =>
  page.goto(`${WP_URL}/wp-admin/${query}`);
