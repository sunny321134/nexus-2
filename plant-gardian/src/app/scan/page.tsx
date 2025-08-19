"use client";
import { useState, useCallback } from "react";
import { classifyImage, Diagnosis } from "../../lib/classifier";
import { useI18n } from "../../lib/i18n";
import { speakText } from "../../lib/tts";

export default function ScanPage() {
  const { t, language } = useI18n();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFile = useCallback(async (file: File) => {
    setError(null);
    setResult(null);
    setLoading(true);
    setImageUrl(URL.createObjectURL(file));
    try {
      const res = await classifyImage(file);
      setResult(res);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to analyze image";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">{t("scanImage")}</h1>
      <div
        className="rounded-xl border border-dashed border-black/20 dark:border-white/20 p-8 text-center focus-within:ring-2"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) onFile(file);
        }}
        aria-label={t("uploadImage")}
      >
        <p className="opacity-80 mb-4">{t("uploadImage")}</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
          }}
          className="mx-auto block"
        />
      </div>

      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="Uploaded leaf" className="mt-6 rounded-lg max-h-80 object-contain mx-auto" />
      )}

      {loading && <p className="mt-6 animate-pulse">{t("analyzing")}</p>}
      {error && <p role="alert" className="mt-6 text-red-600">{error}</p>}

      {result && (
        <div className="mt-8 rounded-xl border border-black/10 dark:border-white/20 p-6">
          <h2 className="text-xl font-semibold mb-2">{t("result")}</h2>
          <p className="mb-2">Disease: <strong>{result.disease}</strong> ({Math.round(result.confidence * 100)}%)</p>
          <h3 className="font-semibold mt-4 mb-2">{t("precautions")}</h3>
          <ul className="list-disc pl-6 space-y-1">
            {result.precautions.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          <button onClick={() => speakText(`Disease ${result.disease}. Precautions: ${result.precautions.join("; ")}.`, language)} className="mt-4 px-4 py-2 rounded-md border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2">
            {t("tts")}
          </button>
        </div>
      )}
    </div>
  );
}

