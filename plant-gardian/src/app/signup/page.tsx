"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "../../lib/auth";
import { useI18n } from "../../lib/i18n";

export default function SignupPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">{t("signup")}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            signUp(name, email, password);
            router.push("/dashboard");
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Signup failed";
            setError(message);
          }
        }}
        className="grid gap-4"
      >
        {error && <p role="alert" className="text-red-600">{error}</p>}
        <label className="grid gap-2">
          <span>{t("name")}</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded-md border border-black/10 dark:border-white/20 bg-transparent focus:outline-none focus:ring-2"
          />
        </label>
        <label className="grid gap-2">
          <span>{t("email")}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-md border border-black/10 dark:border-white/20 bg-transparent focus:outline-none focus:ring-2"
          />
        </label>
        <label className="grid gap-2">
          <span>{t("password")}</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded-md border border-black/10 dark:border-white/20 bg-transparent focus:outline-none focus:ring-2"
          />
        </label>
        <button type="submit" className="mt-2 px-4 py-2 rounded-md bg-foreground text-background hover:opacity-90 focus:outline-none focus:ring-2">
          {t("signup")}
        </button>
        <a className="underline" href="/login">{t("haveAccount")}</a>
      </form>
    </div>
  );
}

