"use client";
import Link from "next/link";
import { useI18n } from "../lib/i18n";
import { speakText } from "../lib/tts";

export default function Home() {
  const { t, language } = useI18n();
  const hero = `${t("appName")} — ${t("tagline")}`;
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          🌿 {t("appName")}
        </h1>
        <p className="mt-4 text-lg opacity-80">{t("tagline")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/scan" className="px-5 py-3 rounded-md bg-foreground text-background hover:opacity-90 focus:outline-none focus:ring-2">
            {t("scanImage")}
          </Link>
          <Link href="/sound" className="px-5 py-3 rounded-md border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2">
            {t("recordAudio")}
          </Link>
          <button onClick={() => speakText(hero, language)} className="px-5 py-3 rounded-md border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2">
            {t("tts")}
          </button>
        </div>
      </div>
      <div aria-hidden className="aspect-video rounded-xl bg-gradient-to-br from-emerald-300 via-lime-200 to-teal-300 dark:from-emerald-700 dark:via-lime-700 dark:to-teal-700 shadow-inner" />
    </section>
  );
}
