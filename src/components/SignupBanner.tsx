"use client";

import Link from "next/link";
import { useDictionary } from "@/components/LocaleProvider";
import { useProgress } from "@/lib/progress";

export function SignupBanner() {
  const { status, done } = useProgress();
  const t = useDictionary().signup;
  if (status !== "anon") return null;

  return (
    <aside className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
      <p>
        {done.size > 0 ? t.savedNow : t.saved}{" "}
        <Link href="/login" className="font-medium underline">
          {t.signIn}
        </Link>
        {t.optional}
      </p>
    </aside>
  );
}
