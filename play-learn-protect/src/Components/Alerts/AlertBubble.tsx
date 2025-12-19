import React, { useMemo } from "react";
import { useAlerts } from "./AlertsContext";

const AlertBubble: React.FC = () => {
  const { alerts, acknowledge } = useAlerts();

  const minor = useMemo(() => alerts.filter((a) => a.severity === "minor").slice(-3), [alerts]);
  if (minor.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
      {minor.map((a) => (
        <button
          key={a.id}
          onClick={() => acknowledge(a.id)}
          className="relative max-w-xs text-left rounded-2xl bg-white dark:bg-slate-800 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 px-4 py-3 hover:ring-slate-300 dark:hover:ring-slate-600 transition"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-7 w-7 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM11.25 8.25h1.5v1.5h-1.5v-1.5zm0 3h1.5v6h-1.5v-6z" clipRule="evenodd" /></svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{a.title}</p>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">{a.message}</p>
              <span className="mt-2 inline-flex items-center text-[11px] font-medium text-amber-700 dark:text-amber-300">Tap to acknowledge</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AlertBubble;
