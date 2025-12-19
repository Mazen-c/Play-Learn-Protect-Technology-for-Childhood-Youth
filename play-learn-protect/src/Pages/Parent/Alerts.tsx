import { useState, useEffect } from "react";
import { useAuth } from "../../Components/Context/AuthContext";

interface Alert {
  id: number;
  childName: string;
  message: string;
  type: "warning" | "danger" | "info" | "success";
  time: string;
  acknowledged: boolean;
  category: "safety" | "screentime" | "learning" | "achievement";
}

const AlertCheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const Alerts: React.FC = () => {
  const auth = useAuth();
  const [childrenList, setChildrenList] = useState<string[]>([]);

  // Get actual children from parent account
  useEffect(() => {
    if (auth.user?.email && auth.user?.role === "parent" && auth.getChildrenForParent) {
      const children = auth.getChildrenForParent(auth.user.email);
      const childNames = children.map(c => c.email.split("_")[0].replace(/([A-Z])/g, " $1").trim());
      setChildrenList(childNames);
    }
  }, [auth]);

  // Generate alerts using actual child names
  const generatedWarningAlerts: Alert[] = childrenList.map((childName, idx) => ({
    id: idx * 2 + 1,
    childName,
    message: `Exceeded daily screen time limit (2h limit, used 2h ${30 + idx * 10}m)`,
    type: "warning" as const,
    time: `${2 + idx} hours ago`,
    acknowledged: false,
    category: "screentime" as const
  }));

  const achievementAlerts: Alert[] = childrenList.map((childName, idx) => ({
    id: idx * 2 + 2,
    childName,
    message: `Completed Learning Module! 🎉`,
    type: "success" as const,
    time: `${idx + 1} day ago`,
    acknowledged: true,
    category: "achievement" as const
  }));

  const defaultAlerts: Alert[] = [...generatedWarningAlerts, ...achievementAlerts];

  const [alerts, setAlerts] = useState<Alert[]>(defaultAlerts);

  const handleAcknowledge = (id: number) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const handleDismiss = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;
  const dangerAlerts = alerts.filter((a) => a.type === "danger");
  const warningAlertsList = alerts.filter((a) => a.type === "warning");

  const getAlertColor = (type: Alert["type"]) => {
    switch (type) {
      case "danger":
        return "bg-red-50 dark:bg-red-900 border-l-4 border-red-500";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500";
      case "success":
        return "bg-green-50 dark:bg-green-900 border-l-4 border-green-500";
      case "info":
        return "bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500";
    }
  };

  const getTextColor = (type: Alert["type"]) => {
    switch (type) {
      case "danger":
        return "text-red-800 dark:text-red-100";
      case "warning":
        return "text-yellow-800 dark:text-yellow-100";
      case "success":
        return "text-green-800 dark:text-green-100";
      case "info":
        return "text-blue-800 dark:text-blue-100";
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">Alerts & Notifications</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">Safety alerts from Digital Protection Module and learning updates</p>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
          <p className="text-red-600 dark:text-red-300 text-sm font-semibold">Safety Alerts</p>
          <p className="text-2xl font-bold text-red-700 dark:text-red-200">{dangerAlerts.length}</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
          <p className="text-yellow-600 dark:text-yellow-300 text-sm font-semibold">Warnings</p>
          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-200">{warningAlertsList.length}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <p className="text-blue-600 dark:text-blue-300 text-sm font-semibold">Pending Action</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">{unacknowledgedCount}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <p className="text-green-600 dark:text-green-300 text-sm font-semibold">Total Alerts</p>
          <p className="text-2xl font-bold text-green-700 dark:text-green-200">{alerts.length}</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg ${getAlertColor(alert.type)} transition-all ${
              !alert.acknowledged ? "ring-2 ring-opacity-50" : "opacity-75"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`mt-1 ${getTextColor(alert.type)}`}>
                  {alert.type === "success" ? <AlertCheckIcon /> : <AlertIcon />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold ${getTextColor(alert.type)}`}>{alert.childName}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        alert.category === "safety"
                          ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-100"
                          : alert.category === "screentime"
                          ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100"
                          : alert.category === "learning"
                          ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-100"
                          : "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100"
                      }`}
                    >
                      {alert.category.charAt(0).toUpperCase() + alert.category.slice(1)}
                    </span>
                  </div>
                  <p className={`${getTextColor(alert.type)} mb-2`}>{alert.message}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{alert.time}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!alert.acknowledged && alert.type !== "success" && (
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    className={`px-3 py-1 rounded text-sm font-bold transition ${
                      alert.type === "danger"
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                  >
                    Acknowledge
                  </button>
                )}
                <button
                  onClick={() => handleDismiss(alert.id)}
                  className="px-3 py-1 rounded text-sm font-bold bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-slate-100 hover:bg-slate-400 dark:hover:bg-slate-500 transition"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400 text-lg">✨ All clear! No alerts at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;
