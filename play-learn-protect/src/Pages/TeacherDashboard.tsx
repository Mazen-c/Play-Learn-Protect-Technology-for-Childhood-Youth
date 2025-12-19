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
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8 text-slate-900 dark:text-slate-100">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg">
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Teacher Dashboard
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Overview of your classes, learning modules, and challenges
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50 transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                  Total Classes
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">2</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/30">
                <svg className="h-6 w-6 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50 transition-all hover:shadow-xl hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                  Students
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">46</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-6 text-white shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-90 mb-2">
                  Average Completion
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">78%</p>
                  <span className="text-xs opacity-80">
                    Last 7 days
                  </span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/30">
                <svg className="h-5 w-5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Create Learning Module</h2>
            </div>
            <div className="space-y-4">
              <input 
                className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/20" 
                placeholder="Module title" 
                value={moduleTitle} 
                onChange={e => setModuleTitle(e.target.value)} 
              />
              <textarea 
                className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/20 resize-none" 
                placeholder="Short description" 
                rows={3}
                value={moduleDesc} 
                onChange={e => setModuleDesc(e.target.value)} 
              />
              <div className="flex gap-3">
                <button 
                  onClick={handleAddModule} 
                  className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:shadow-xl hover:shadow-sky-500/40 hover:scale-[1.02]"
                >
                  Add Module
                </button>
                <button 
                  onClick={() => { setModuleTitle(""); setModuleDesc(""); }} 
                  className="rounded-xl border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Clear
                </button>
              </div>
              {modules.length > 0 && (
                <div className="mt-6 space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Existing Modules</h3>
                  {modules.map(m => (
                    <div key={m.id} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 p-3 text-slate-900 dark:text-slate-100 transition-all hover:border-sky-300 dark:hover:border-sky-700">
                      <div className="font-semibold text-sm">{m.title}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{m.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Class Completion
              </h2>
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Track overall module completion for each class
            </p>
            <ul className="space-y-3">
              {classStats.map((cls) => (
                <li key={cls.name} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800 px-4 py-3 text-sm transition-all hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {cls.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
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

          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <svg className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Create Challenge
              </h2>
            </div>
            <div className="space-y-4">
              <input 
                className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20" 
                placeholder="Challenge title" 
                value={challengeTitle} 
                onChange={e => setChallengeTitle(e.target.value)} 
              />
              <textarea 
                className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 resize-none" 
                placeholder="Short description" 
                rows={3}
                value={challengeDesc} 
                onChange={e => setChallengeDesc(e.target.value)} 
              />
              <div className="flex gap-3">
                <button 
                  onClick={handleAddChallenge} 
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02]"
                >
                  Add Challenge
                </button>
                <button 
                  onClick={() => { setChallengeTitle(""); setChallengeDesc(""); }} 
                  className="rounded-xl border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Clear
                </button>
              </div>
              {challenges.length > 0 && (
                <div className="mt-6 space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Existing Challenges</h3>
                  {challenges.map(c => (
                    <div key={c.id} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 p-3 text-slate-900 dark:text-slate-100 transition-all hover:border-emerald-300 dark:hover:border-emerald-700">
                      <div className="font-semibold text-sm">{c.title}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{c.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;


