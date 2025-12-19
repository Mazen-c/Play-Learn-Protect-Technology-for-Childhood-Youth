import React, { useEffect, useMemo, useRef } from "react";
import { Alert, useAlerts } from "./AlertsContext";

const useSpeech = () => {
  const speak = (text: string) => {
    try {
      const synth = (window as any).speechSynthesis as SpeechSynthesis | undefined;
      if (!synth) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1;
      synth.speak(utter);
    } catch {}
  };
  return { speak };
};

const SeriousAlertModal: React.FC = () => {
  const { alerts, acknowledge } = useAlerts();
  const { speak } = useSpeech();

  const serious = useMemo<Alert | undefined>(() => alerts.find((a) => a.severity === "serious"), [alerts]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!serious) return;
    if (serious.audioUrl) {
      // Attempt to play; browsers may block without gesture
      const el = audioRef.current;
      if (el) {
        el.currentTime = 0;
        el.play().catch(() => {});
      }
    } else if (serious.message) {
      speak(`${serious.title}. ${serious.message}`);
    }
  }, [serious, speak]);

  if (!serious) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm dark:bg-slate-950/80" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="serious-alert-title"
        className="relative z-10 w-full max-w-lg mx-4 rounded-2xl bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 shadow-xl"
      >
        <div className="px-6 pt-6">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-9 w-9 flex items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 2.25a.75.75 0 01.67.415l9 18A.75.75 0 0121 21.75H3a.75.75 0 01-.67-1.085l9-18a.75.75 0 01.67-.415zm0 5.25a.75.75 0 00-.75.75v5.25a.75.75 0 001.5 0V8.25A.75.75 0 0012 7.5zm0 9a.75.75 0 100 1.5.75.75 0 000-1.5z" clipRule="evenodd" /></svg>
            </div>
            <div className="flex-1">
              <h2 id="serious-alert-title" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {serious.title}
              </h2>
              <p className="mt-1 text-slate-700 dark:text-slate-300">{serious.message}</p>
            </div>
          </div>
          {serious.audioUrl && (
            <div className="mt-4">
              <audio ref={audioRef} controls className="w-full" src={serious.audioUrl} />
            </div>
          )}
        </div>
        <div className="px-6 pb-6 pt-4 flex gap-3 justify-end">
          <button
            onClick={() => acknowledge(serious.id)}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:focus-visible:ring-offset-slate-800 focus-visible:ring-offset-2"
          >
            {serious.acknowledgeLabel || "I understand"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeriousAlertModal;
