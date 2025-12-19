import React, { useEffect, useState } from "react";
import { useAuth } from "../../Components/Context/AuthContext";

interface Challenge {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  reward: number;
  participants: number;
  yourRank: number;
  isActive: boolean;
}

const ChildChallenges: React.FC = () => {
  const auth = useAuth();
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const chs = auth.getChallenges();
    const mapped: Challenge[] = chs.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      startDate: c.startDate || new Date().toISOString(),
      endDate: c.endDate || new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      reward: c.reward || 0,
      participants: Math.floor(10 + Math.random() * 30),
      yourRank: Math.floor(1 + Math.random() * 20),
      isActive: true,
    }));
    setActiveChallenges(mapped.filter(m => m.isActive));
    setCompletedChallenges(mapped.filter(m => !m.isActive));
  }, [auth]);

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => (
    <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {challenge.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {challenge.description}
          </p>
        </div>
        {challenge.isActive && (
          <span className="ml-4 inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
            ● Live
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-slate-600 dark:text-slate-400">Reward</p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            ⭐ {challenge.reward} pts
          </p>
        </div>
        <div>
          <p className="text-slate-600 dark:text-slate-400">Participants</p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {challenge.participants} players
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4 rounded-lg bg-slate-50 dark:bg-slate-700 p-3">
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Your Rank</p>
          <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
            #{challenge.yourRank}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Duration
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {new Date(challenge.startDate).toLocaleDateString()} -{" "}
            {new Date(challenge.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <button className="w-full rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600">
        {challenge.isActive ? "Continue Challenge" : "View Results"}
      </button>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 px-4 py-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Challenges & Competitions
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Participate in challenges and compete with other learners
          </p>
        </header>

        {/* Active Challenges */}
        {activeChallenges.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              🔥 Active Challenges
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {activeChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </section>
        )}

        {/* Completed Challenges */}
        {completedChallenges.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              ✅ Completed Challenges
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {completedChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </section>
        )}

        {activeChallenges.length + completedChallenges.length === 0 && (
          <div className="rounded-xl bg-white dark:bg-slate-800 p-12 text-center shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              No challenges available right now. Check back soon! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildChallenges;
