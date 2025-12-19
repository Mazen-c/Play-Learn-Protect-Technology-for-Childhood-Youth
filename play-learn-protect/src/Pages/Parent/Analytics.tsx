import { useState, useEffect } from "react";
import { useAuth } from "../../Components/Context/AuthContext";

interface DailyData {
  day: string;
  hours: number;
  modules: string[];
}

interface ToolUsage {
  name: string;
  minutes: number;
  color: string;
}

interface ModuleCompletion {
  name: string;
  completed: number;
  total: number;
  percentage: number;
}

const Analytics: React.FC = () => {
  const auth = useAuth();
  const [childrenList, setChildrenList] = useState<string[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>("");

  // Get actual children from parent account
  useEffect(() => {
    if (auth.user?.email && auth.user?.role === "parent" && auth.getChildrenForParent) {
      const children = auth.getChildrenForParent(auth.user.email);
      const childNames = children.map(c => c.email.split("_")[0].replace(/([A-Z])/g, " $1").trim());
      setChildrenList(childNames);
      if (childNames.length > 0) {
        setSelectedChild(childNames[0]);
      }
    }
  }, [auth]);

  // Daily screen time data for the week
  const dailyScreenTime: DailyData[] = [
    { day: "Mon", hours: 1.5, modules: ["Math", "Science"] },
    { day: "Tue", hours: 2.0, modules: ["Math", "Art"] },
    { day: "Wed", hours: 1.8, modules: ["Coding", "Science"] },
    { day: "Thu", hours: 2.2, modules: ["Math", "Coding", "Art"] },
    { day: "Fri", hours: 1.3, modules: ["Science"] },
    { day: "Sat", hours: 2.5, modules: ["Game", "Math", "Art"] },
    { day: "Sun", hours: 1.7, modules: ["Coding", "Science"] }
  ];

  // Tool and game usage
  const toolUsage: ToolUsage[] = [
    { name: "Math Games", minutes: 240, color: "bg-blue-500" },
    { name: "Science Videos", minutes: 180, color: "bg-green-500" },
    { name: "Coding Activities", minutes: 120, color: "bg-purple-500" },
    { name: "Art Studio", minutes: 150, color: "bg-pink-500" },
    { name: "Reading Module", minutes: 90, color: "bg-yellow-500" }
  ];

  // Learning module completion
  const moduleCompletion: ModuleCompletion[] = [
    { name: "Math Basics", completed: 17, total: 20, percentage: 85 },
    { name: "Science Explorer", completed: 12, total: 20, percentage: 60 },
    { name: "Reading Challenge", completed: 9, total: 20, percentage: 45 },
    { name: "Coding Intro", completed: 14, total: 20, percentage: 70 },
    { name: "Art Fundamentals", completed: 16, total: 20, percentage: 80 }
  ];

  const maxHours = Math.max(...dailyScreenTime.map(d => d.hours));
  const maxMinutes = Math.max(...toolUsage.map(t => t.minutes));

  return (
    <div className="p-6 bg-white dark:bg-slate-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">Analytics</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">Track learning progress and activity</p>

      {/* Child Selection */}
      <div className="mb-8 flex gap-3">
        {childrenList.map((child) => (
          <button
            key={child}
            onClick={() => setSelectedChild(child)}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              selectedChild === child
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {child}
          </button>
        ))}
      </div>

      {/* Daily Screen Time Visualization */}
      <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Daily Screen Time (This Week)</h2>
        <div className="flex items-end justify-around h-64 gap-2 px-4 py-8 bg-slate-50 dark:bg-slate-600 rounded-lg">
          {dailyScreenTime.map((data, idx) => {
            const heightPercent = (data.hours / maxHours) * 100;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-12 mb-2" title={`${data.modules.join(", ")}`}>
                  <div
                    className="w-full bg-indigo-500 rounded-t-lg transition-all duration-300 hover:bg-indigo-600"
                    style={{ height: `${heightPercent * 1.5}px` }}
                  ></div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{data.day}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{data.hours}h</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">This week's total: {dailyScreenTime.reduce((sum, d) => sum + d.hours, 0).toFixed(1)}h</p>
      </div>

      {/* Game & Tool Usage */}
      <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Specific Game & Tool Usage</h2>
        <div className="space-y-4">
          {toolUsage.map((tool, idx) => {
            const widthPercent = (tool.minutes / maxMinutes) * 100;
            return (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{tool.name}</span>
                  <span className="text-slate-600 dark:text-slate-400 font-bold">{tool.minutes} mins</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
                  <div
                    className={`${tool.color} h-3 rounded-full transition-all duration-300`}
                    style={{ width: `${widthPercent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">Total usage time: {toolUsage.reduce((sum, t) => sum + t.minutes, 0)} minutes</p>
      </div>

      {/* Learning Module Completion */}
      <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Learning Module Completion</h2>
        <div className="space-y-5">
          {moduleCompletion.map((module, idx) => (
            <div key={idx} className="border-b border-slate-200 dark:border-slate-600 pb-4 last:border-b-0">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{module.name}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                  {module.completed}/{module.total} ({module.percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${module.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {module.percentage >= 80
                  ? "🌟 Excellent progress!"
                  : module.percentage >= 60
                  ? "📈 Good progress"
                  : "⏳ Keep going!"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <p className="text-slate-600 dark:text-slate-300 text-sm">Avg Daily Time</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
            {(dailyScreenTime.reduce((sum, d) => sum + d.hours, 0) / dailyScreenTime.length).toFixed(1)}h
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <p className="text-slate-600 dark:text-slate-300 text-sm">Modules in Progress</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-300">
            {moduleCompletion.filter(m => m.percentage > 0 && m.percentage < 100).length}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <p className="text-slate-600 dark:text-slate-300 text-sm">Completed Modules</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
            {moduleCompletion.filter(m => m.percentage === 100).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
