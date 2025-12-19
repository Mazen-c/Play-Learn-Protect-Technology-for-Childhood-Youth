import React, { useState } from "react";
import Leaderboard, {
  LeaderboardEntry,
} from "../Components/LeaderBoard";

const initialLeaderboard: LeaderboardEntry[] = [
  { name: "Ali Khan", points: 980 },
  { name: "Sara Noor", points: 940 },
  { name: "Omar Ali", points: 930 },
];

const TeacherChallenges: React.FC = () => {
  const [title, setTitle] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const handleCreateChallenge = () => {
    if (!title || !startAt || !endAt) return;

    // Placeholder for backend integration.
    // eslint-disable-next-line no-alert
    alert("Challenge created (connect to backend).");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 text-slate-900 dark:text-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Challenges & Competitions
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Create time-limited challenges and monitor a live leaderboard
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <section className="space-y-6 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <svg className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                New Challenge
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Title
                </label>
                <input
                  className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20"
                  placeholder="e.g. Password Ninja Week"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Starts At
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20"
                    value={startAt}
                    onChange={(event) =>
                      setStartAt(event.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Ends At
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20"
                    value={endAt}
                    onChange={(event) => setEndAt(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCreateChallenge}
              disabled={!title || !startAt || !endAt}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition-all hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              Create Challenge
            </button>
          </section>

          <section className="space-y-6 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Live Leaderboard
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Updating Live
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Rankings update in real time as students complete challenge activities
            </p>
            <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800 p-4">
              <Leaderboard data={initialLeaderboard} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherChallenges;


