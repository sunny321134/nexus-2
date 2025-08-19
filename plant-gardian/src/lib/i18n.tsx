"use client";

import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

export type SupportedLanguage = "en" | "es" | "hi";

type TranslationDict = Record<string, Record<SupportedLanguage, string>>;

const TRANSLATIONS: TranslationDict = {
  appName: {
    en: "Plant Gardian",
    es: "Plant Gardian",
    hi: "प्लांट गार्डियन",
  },
  tagline: {
    en: "Detect plant diseases from images or leaf sounds.",
    es: "Detecta enfermedades de plantas con imágenes o sonidos de hojas.",
    hi: "पत्तियों की तस्वीर या ध्वनि से पौधों की बीमारियाँ पहचानें।",
  },
  getStarted: { en: "Get Started", es: "Comenzar", hi: "शुरू करें" },
  login: { en: "Log in", es: "Iniciar sesión", hi: "लॉगिन" },
  signup: { en: "Sign up", es: "Registrarse", hi: "साइन अप" },
  logout: { en: "Log out", es: "Cerrar sesión", hi: "लॉगआउट" },
  dashboard: { en: "Dashboard", es: "Panel", hi: "डैशबोर्ड" },
  scanImage: { en: "Scan Leaf Image", es: "Escanear imagen de hoja", hi: "पत्ती की छवि स्कैन करें" },
  recordAudio: { en: "Record Leaf Sound", es: "Grabar sonido de la hoja", hi: "पत्ती की ध्वनि रिकॉर्ड करें" },
  uploadImage: { en: "Upload or drop an image", es: "Sube o suelta una imagen", hi: "छवि अपलोड करें या छोड़ें" },
  analyzing: { en: "Analyzing...", es: "Analizando...", hi: "विश्लेषण हो रहा है..." },
  startRecording: { en: "Start Recording", es: "Comenzar grabación", hi: "रिकॉर्डिंग शुरू करें" },
  stopRecording: { en: "Stop Recording", es: "Detener", hi: "रोकें" },
  result: { en: "Result", es: "Resultado", hi: "परिणाम" },
  precautions: { en: "Precautions", es: "Precauciones", hi: "सावधानियाँ" },
  selectLanguage: { en: "Language", es: "Idioma", hi: "भाषा" },
  tts: { en: "Speak", es: "Hablar", hi: "आवाज़" },
  email: { en: "Email", es: "Correo", hi: "ईमेल" },
  password: { en: "Password", es: "Contraseña", hi: "पासवर्ड" },
  name: { en: "Name", es: "Nombre", hi: "नाम" },
  haveAccount: { en: "Have an account? Log in", es: "¿Tienes cuenta? Inicia sesión", hi: "खाता है? लॉगिन करें" },
  noAccount: { en: "No account? Sign up", es: "¿Sin cuenta? Regístrate", hi: "खाता नहीं? साइन अप करें" },
};

type I18nContextValue = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof typeof TRANSLATIONS) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("pg_lang") as SupportedLanguage | null) : null;
    if (saved) setLanguageState(saved);
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") localStorage.setItem("pg_lang", lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  };

  const t = useMemo(() => {
    return (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language] ?? key;
  }, [language]);

  const value: I18nContextValue = { language, setLanguage, t };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export const LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "hi", label: "हिंदी" },
];

