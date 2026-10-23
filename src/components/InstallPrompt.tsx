"use client";

import { useSyncExternalStore } from "react";

// Chrome's install event isn't in the DOM typings yet.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Mode = "hidden" | "prompt" | "ios" | "android";

const DISMISSED_KEY = "install-prompt-dismissed";

let deferred: BeforeInstallPromptEvent | null = null;
let dismissed = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

// Listen at module load so an event fired before hydration isn't missed.
if (typeof window !== "undefined") {
  try {
    dismissed = localStorage.getItem(DISMISSED_KEY) === "1";
  } catch {}
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    dismiss();
  });
}

function dismiss() {
  dismissed = true;
  try {
    localStorage.setItem(DISMISSED_KEY, "1");
  } catch {}
  notify();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const media = matchMedia("(display-mode: standalone)");
  media.addEventListener("change", onChange);
  return () => {
    listeners.delete(onChange);
    media.removeEventListener("change", onChange);
  };
}

function getSnapshot(): Mode {
  if (dismissed) return "hidden";
  const standalone =
    matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (standalone) return "hidden";
  if (deferred) return "prompt";
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac, so check for touch too.
  if (
    /iPhone|iPad|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  ) {
    return "ios";
  }
  if (/Android/.test(ua)) return "android";
  return "hidden";
}

const getServerSnapshot = (): Mode => "hidden";

async function install() {
  if (!deferred) return;
  const event = deferred;
  deferred = null;
  await event.prompt();
  // Chrome won't offer the event again soon, so either answer ends it.
  await event.userChoice;
  dismiss();
}

export function InstallPrompt() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (mode === "hidden") return null;

  return (
    <aside
      aria-labelledby="install-heading"
      className="fixed inset-x-3 bottom-3 z-40 rounded-xl border border-neutral-200 bg-white p-4 text-sm shadow-lg sm:hidden dark:border-neutral-800 dark:bg-neutral-900"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon-192.png"
          alt=""
          width={40}
          height={40}
          className="rounded-lg"
        />
        <div className="flex-1">
          <h2 id="install-heading" className="font-semibold">
            Add Start Your Store to your phone
          </h2>
          {mode === "prompt" && (
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">
              Open your checklist from your home screen like an app.
            </p>
          )}
          {mode === "ios" && (
            <ol className="mt-1 list-decimal space-y-1 pl-4 text-neutral-600 dark:text-neutral-400">
              <li>
                Tap the Share button <ShareIcon /> in the browser toolbar.
              </li>
              <li>
                Scroll down and tap <strong>Add to Home Screen</strong>.
              </li>
              <li>
                Tap <strong>Add</strong>.
              </li>
            </ol>
          )}
          {mode === "android" && (
            <ol className="mt-1 list-decimal space-y-1 pl-4 text-neutral-600 dark:text-neutral-400">
              <li>
                Open the browser menu <MenuIcon />.
              </li>
              <li>
                Tap <strong>Install app</strong> or{" "}
                <strong>Add to Home screen</strong>.
              </li>
            </ol>
          )}
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss install instructions"
          className="-m-1 rounded-md p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      {mode === "prompt" && (
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="rounded-lg px-3 py-2 font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            Not now
          </button>
          <button
            type="button"
            onClick={install}
            className="rounded-lg bg-emerald-600 px-3 py-2 font-medium text-white hover:bg-emerald-700"
          >
            Install
          </button>
        </div>
      )}
    </aside>
  );
}

function ShareIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline align-text-bottom"
      aria-label="(square with an up arrow)"
      role="img"
    >
      <path d="M12 3v12M8 7l4-4 4 4M5 11v9h14v-9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline align-text-bottom"
      aria-label="(three dots)"
      role="img"
    >
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  );
}
