"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LANGUAGES, useI18n } from "../lib/i18n";
import { getCurrentUser, signOut } from "../lib/auth";
import React from "react";

export default function Navbar() {
  const { language, setLanguage, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const user = getCurrentUser();

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur bg-background/70 border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between" aria-label="Primary">
        <Link href="/" className="text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md" aria-label={t("appName")}>🌿 {t("appName")}</Link>
        <div className="flex items-center gap-3">
          <Link href="/scan" className={`px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 ${pathname === "/scan" ? "font-semibold" : ""}`}>{t("scanImage")}</Link>
          <Link href="/sound" className={`px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 ${pathname === "/sound" ? "font-semibold" : ""}`}>{t("recordAudio")}</Link>
          <label className="sr-only" htmlFor="language-select">{t("selectLanguage")}</label>
          <select
            id="language-select"
            className="px-2 py-1 rounded-md border border-black/10 dark:border-white/20 bg-transparent focus:outline-none focus:ring-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
            aria-label={t("selectLanguage")}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          {user ? (
            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="px-3 py-2 rounded-md border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2"
            >
              {t("logout")}
            </button>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="px-3 py-2 rounded-md border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2">{t("login")}</Link>
              <Link href="/signup" className="px-3 py-2 rounded-md bg-foreground text-background hover:opacity-90 focus:outline-none focus:ring-2">{t("signup")}</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

