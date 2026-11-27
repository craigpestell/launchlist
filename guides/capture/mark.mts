import type { Page } from "playwright";

/**
 * Some sites (NY Business Express, for one) put a whole section in one element, so
 * getByText outlines the section. Wrap just the matching text in a span to
 * outline that instead. Returns the span's selector.
 */
export async function markText(page: Page, text: string): Promise<string> {
  const found = await page.evaluate((text) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const at = node.textContent!.indexOf(text);
      if (at < 0 || !(node.parentElement as HTMLElement).offsetParent) continue;
      const range = document.createRange();
      range.setStart(node, at);
      range.setEnd(node, at + text.length);
      const span = document.createElement("span");
      span.dataset.guideMark = "";
      range.surroundContents(span);
      span.scrollIntoView({ block: "center" });
      return true;
    }
    return false;
  }, text);
  if (!found) throw new Error(`text not found: ${text}`);
  return "[data-guide-mark]";
}
