import React, { useEffect, useState } from "react";
import { useAuth } from "../Components/Context/AuthContext";
import ProgressBar from "../Components/ProgressBar";
import { useAlerts } from "../Components/Alerts/AlertsContext";

const classStats = [
  { name: "Grade 5 - A", students: 24, completion: 82 },
  { name: "Grade 6 - B", students: 22, completion: 74 },
];

// Note: Leaderboard display removed from this page for now

const TeacherDashboard: React.FC = () => {
  const auth = useAuth();
  const { triggerAlert } = useAlerts();
  const [modules, setModules] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);

  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");

  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDesc, setChallengeDesc] = useState("");

  useEffect(() => {
    setModules(auth.getModules());
    setChallenges(auth.getChallenges());
  }, [auth]);

  useEffect(() => {
    if (auth.user?.role !== "educator") return;
    const key = "plp_teacher_dashboard_minor_tip_shown";
    if (!sessionStorage.getItem(key)) {
      triggerAlert({
        severity: "minor",
        title: "Teacher Tip",
        message: "Remind students: no personal details in assignments or challenges.",
      });
      sessionStorage.setItem(key, "1");
    }
  }, [auth.user?.role, triggerAlert]);

  const handleAddModule = () => {
    if (!moduleTitle.trim()) return;
    const item = auth.addModule({ title: moduleTitle.trim(), description: moduleDesc.trim(), createdBy: auth.user?.email || "" });
    setModules(prev => [item, ...prev]);
    setModuleTitle(""); setModuleDesc("");
  };

  const handleAddChallenge = () => {
    if (!challengeTitle.trim()) return;
    const item = auth.addChallenge({ title: challengeTitle.trim(), description: challengeDesc.trim(), createdBy: auth.user?.email || "" });
    setChallenges(prev => [item, ...prev]);
    setChallengeTitle(""); setChallengeDesc("");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6 text-slate-900 dark:text-slate-100">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Teacher dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Overview of your classes, learning modules, and challenges.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total classes
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">2</p>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Students
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">46</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 p-4 text-white shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide opacity-80">
              Average completion
            </p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-semibold">78%</p>
              <span className="text-xs opacity-90">
                Last 7 days
              </span>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Create Learning Module</h2>
            <input className="w-full mb-2 p-2 rounded border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100" placeholder="Module title" value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} />
            <textarea className="w-full mb-2 p-2 rounded border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100" placeholder="Short description" value={moduleDesc} onChange={e => setModuleDesc(e.target.value)} />
            <div className="flex gap-2">
              <button onClick={handleAddModule} className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white">Add Module</button>
              <button onClick={() => { setModuleTitle(""); setModuleDesc(""); }} className="rounded-md border px-4 py-2 text-sm">Clear</button>
            </div>
            {modules.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-200">Existing Modules</h3>
                {modules.map(m => (
                  <div key={m.id} className="p-2 rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                    <div className="font-semibold">{m.title}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">{m.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <h2 className="text-sm font-semibold text-slate-900">
              Class completion
            </h2>
            <p className="mb-4 text-xs text-slate-500 dark:text-slate-300">
              Track overall module completion for each class.
            </p>
            <ul className="space-y-3">
              {classStats.map((cls) => (
                <li key={cls.name} className="rounded-lg bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">
                        {cls.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-300">
                        {cls.students} students
                      </p>
                    </div>
                    <div className="w-32">
                      <ProgressBar progress={cls.completion} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Create Challenge
              </h2>
            </div>
            <input className="w-full mb-2 p-2 rounded border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100" placeholder="Challenge title" value={challengeTitle} onChange={e => setChallengeTitle(e.target.value)} />
            <textarea className="w-full mb-2 p-2 rounded border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100" placeholder="Short description" value={challengeDesc} onChange={e => setChallengeDesc(e.target.value)} />
            <div className="flex gap-2">
              <button onClick={handleAddChallenge} className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white">Add Challenge</button>
              <button onClick={() => { setChallengeTitle(""); setChallengeDesc(""); }} className="rounded-md border px-4 py-2 text-sm">Clear</button>
            </div>
            {challenges.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-200">Existing Challenges</h3>
                {challenges.map(c => (
                  <div key={c.id} className="p-2 rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">{c.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;


