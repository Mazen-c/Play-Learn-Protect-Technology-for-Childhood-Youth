import React from "react";
import ProgressBar from "../Components/ProgressBar";
import Leaderboard, {
  LeaderboardEntry,
} from "../Components/LeaderBoard";

const classStats = [
  { name: "Grade 5 - A", students: 24, completion: 82 },
  { name: "Grade 6 - B", students: 22, completion: 74 },
];

const activeChallenges: LeaderboardEntry[] = [
  { name: "Password Ninja", points: 980 },
  { name: "Phishing Hunter", points: 940 },
  { name: "Safety Sprint", points: 910 },
];

const TeacherDashboard: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Teacher dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Overview of your classes, learning modules, and challenges.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total classes
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">2</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
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
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              Class completion
            </h2>
            <p className="mb-4 text-xs text-slate-500">
              Track overall module completion for each class.
            </p>
            <ul className="space-y-3">
              {classStats.map((cls) => (
                <li
                  key={cls.name}
                  className="rounded-lg bg-slate-50 px-3 py-2 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">
                        {cls.name}
                      </p>
                      <p className="text-xs text-slate-500">
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

          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Active challenges
              </h2>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                Live
              </span>
            </div>
            <p className="mb-2 text-xs text-slate-500">
              Top performing students across your current challenges.
            </p>
            <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-2">
              <Leaderboard data={activeChallenges} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;


