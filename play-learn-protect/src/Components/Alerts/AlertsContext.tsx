import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export type AlertSeverity = "serious" | "minor";

export interface AlertInput {
  severity: AlertSeverity;
  title: string;
  message: string;
  audioUrl?: string;
  acknowledgeLabel?: string;
  onAcknowledge?: () => void;
}

export interface Alert extends AlertInput {
  id: string;
  createdAt: number;
}

interface AlertsContextValue {
  alerts: Alert[];
  triggerAlert: (input: AlertInput) => string; // returns id
  acknowledge: (id: string) => void;
  clearAll: () => void;
}

const AlertsContext = createContext<AlertsContextValue | undefined>(undefined);

export const useAlerts = () => {
  const ctx = useContext(AlertsContext);
  if (!ctx) throw new Error("useAlerts must be used within AlertsProvider");
  return ctx;
};

const genId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export const AlertsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const acknowledgeCallbacks = useRef(new Map<string, () => void>());

  const triggerAlert = useCallback((input: AlertInput) => {
    const id = genId();
    const alert: Alert = {
      id,
      createdAt: Date.now(),
      acknowledgeLabel: "I understand",
      ...input,
    };
    setAlerts((prev) => [...prev, alert]);
    if (input.onAcknowledge) acknowledgeCallbacks.current.set(id, input.onAcknowledge);
    return id;
  }, []);

  const acknowledge = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    const cb = acknowledgeCallbacks.current.get(id);
    if (cb) {
      acknowledgeCallbacks.current.delete(id);
      try { cb(); } catch {}
    }
  }, []);

  const clearAll = useCallback(() => {
    setAlerts([]);
    acknowledgeCallbacks.current.clear();
  }, []);

  const value = useMemo(() => ({ alerts, triggerAlert, acknowledge, clearAll }), [alerts, triggerAlert, acknowledge, clearAll]);

  return <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>;
};
