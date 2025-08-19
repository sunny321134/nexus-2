"use client";
import Link from "next/link";
import { useI18n } from "../../lib/i18n";
import { getCurrentUser } from "../../lib/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { t } = useI18n();
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">{t("dashboard")}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/scan" className="rounded-xl p-6 border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2">
          {t("scanImage")}
        </Link>
        <Link href="/sound" className="rounded-xl p-6 border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2">
          {t("recordAudio")}
        </Link>
      </div>
    </div>
  );
}

