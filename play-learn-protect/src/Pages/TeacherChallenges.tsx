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
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Challenges & competitions
          </h1>
          <p className="text-sm text-slate-500">
            Create time-limited challenges and monitor a live leaderboard.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <section className="space-y-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              New challenge
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Title
                </label>
                <input
                  className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. Password Ninja Week"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Starts at
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    value={startAt}
                    onChange={(event) =>
                      setStartAt(event.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Ends at
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    value={endAt}
                    onChange={(event) => setEndAt(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCreateChallenge}
              className="inline-flex items-center rounded-md bg-sky-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
            >
              Create challenge
            </button>
          </section>

          <section className="space-y-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Live leaderboard
              </h2>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                ● Updating live
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Rankings update in real time as students complete challenge
              activities.
            </p>
            <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-2">
              <Leaderboard data={initialLeaderboard} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherChallenges;


