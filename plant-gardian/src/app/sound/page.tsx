"use client";
import { useEffect, useState } from "react";
import { classifyAudio, Diagnosis } from "../../lib/classifier";
import { useI18n } from "../../lib/i18n";
import { speakText } from "../../lib/tts";

export default function SoundPage() {
	const { t, language } = useI18n();
	const [recording, setRecording] = useState(false);
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
	const [chunks, setChunks] = useState<BlobPart[]>([]);
	const [result, setResult] = useState<Diagnosis | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		return () => {
			if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
		};
	}, [mediaRecorder]);

	const start = async () => {
		setError(null);
		setResult(null);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mr = new MediaRecorder(stream);
			setChunks([]);
			mr.ondataavailable = (e) => {
				setChunks((prev) => [...prev, e.data]);
			};
			mr.onstop = async () => {
				const blob = new Blob(chunks, { type: "audio/webm" });
				try {
					const res = await classifyAudio(blob);
					setResult(res);
				} catch (e: unknown) {
					const message = e instanceof Error ? e.message : "Failed to analyze audio";
					setError(message);
				}
			};
			mr.start();
			setMediaRecorder(mr);
			setRecording(true);
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Microphone access denied";
			setError(message);
		}
	};

	const stop = () => {
		if (!mediaRecorder) return;
		mediaRecorder.stop();
		setRecording(false);
	};

	return (
		<div className="mx-auto max-w-3xl px-4 py-10">
			<h1 className="text-2xl font-bold mb-6">{t("recordAudio")}</h1>
			<div className="rounded-xl border border-black/10 dark:border-white/20 p-6">
				{!recording ? (
					<button onClick={start} className="px-5 py-3 rounded-md bg-foreground text-background hover:opacity-90 focus:outline-none focus:ring-2">
						{t("startRecording")}
					</button>
				) : (
					<button onClick={stop} className="px-5 py-3 rounded-md border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2">
						{t("stopRecording")}
					</button>
				)}
				{error && <p role="alert" className="mt-4 text-red-600">{error}</p>}
			</div>

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