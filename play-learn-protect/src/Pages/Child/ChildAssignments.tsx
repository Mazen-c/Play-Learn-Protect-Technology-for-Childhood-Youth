import React, { useEffect, useState } from "react";
import { useAuth } from "../../Components/Context/AuthContext";
import { useAlerts } from "../../Components/Alerts/AlertsContext";

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "completed" | "submitted";
  progress: number;
  description: string;
}

const ChildAssignments: React.FC = () => {
  const auth = useAuth();
  const { triggerAlert } = useAlerts();
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const mods = auth.getModules();
    const mapped: Assignment[] = mods.map((m) => ({
      id: m.id,
      title: m.title,
      subject: "Learning Module",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      status: "pending",
      progress: 0,
      description: m.description,
    }));

    // Add sample assignments if no teacher modules exist
    const sampleAssignments: Assignment[] = [
      {
        id: 1001,
        title: "Complete Math Quiz",
        subject: "Mathematics",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
        status: "pending",
        progress: 45,
        description: "Complete all counting and addition exercises"
      },
      {
        id: 1002,
        title: "Science Project: Solar System",
        subject: "Science",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
        status: "submitted",
        progress: 100,
        description: "Create a model of the solar system"
      },
      {
        id: 1003,
        title: "Reading Comprehension",
        subject: "Language Arts",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
        status: "completed",
        progress: 100,
        description: "Read the story and answer questions"
      },
      {
        id: 1004,
        title: "Coding Challenge: Loops",
        subject: "Computer Science",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
        status: "pending",
        progress: 20,
        description: "Practice loop exercises in the coding playground"
      }
    ];

    setAssignments(mapped.length > 0 ? mapped : sampleAssignments);
  }, [auth]);

  useEffect(() => {
    const key = "plp_child_assignments_minor_alert_shown";
    if (!sessionStorage.getItem(key)) {
      triggerAlert({
        severity: "minor",
        title: "Safety Tip",
        message: "Be respectful in submissions and never include personal info.",
      });
      sessionStorage.setItem(key, "1");
    }
  }, [triggerAlert]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700";
      case "submitted":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700";
      case "pending":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700";
      default:
        return "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300";
      case "submitted":
        return "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300";
      default:
        return "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200";
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 px-4 py-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">My Assignments</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Complete your learning modules and assignments</p>
        </header>

        <div className="space-y-4">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <div key={assignment.id} className={`rounded-xl border-2 p-6 shadow-sm transition ${getStatusColor(assignment.status)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{assignment.title}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{assignment.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ml-4 ${getStatusBadgeColor(assignment.status)}`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Subject</p>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{assignment.subject}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Due Date</p>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Progress</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{assignment.progress}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-sky-500" style={{ width: `${assignment.progress}%` }} />
                  </div>
                </div>

                <button className="mt-4 w-full rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600">
                  {assignment.status === "completed" ? "View Submission" : "Continue"}
                </button>
              </div>
            ))
          ) : (
            <div className="rounded-xl bg-white dark:bg-slate-800 p-12 text-center shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
              <p className="text-slate-500 dark:text-slate-400">No assignments available right now.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildAssignments;
