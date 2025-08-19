"use client";

export function speakText(text: string, lang: string) {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  const voices = synth.getVoices();
  const matching = voices.find((v) => v.lang.toLowerCase().startsWith(lang.toLowerCase()));
  if (matching) utterance.voice = matching;
  synth.cancel();
  synth.speak(utterance);
}

