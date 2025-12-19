import StatCard from "../../Components/parent/StatCard";
import { useAuth } from "../../Components/Context/AuthContext";
import { useState, useEffect } from "react";

interface ChildActivity {
  name: string;
  points: number;
  achievements: number;
  todayTime: string;
  thisWeekTime: string;
  lastActive: string;
  learningModules: { name: string; progress: number }[];
  recentActivity: { activity: string; time: string; points: number }[];
}

const ParentDashboard: React.FC = () => {
  const auth = useAuth();
  const isChild = auth.user?.role === "child";
  const childName = isChild ? auth.user?.email?.split("_")[0].replace(/([A-Z])/g, " $1").trim() : "";
  const [selectedChild, setSelectedChild] = useState<ChildActivity | null>(null);
  const [childrenList, setChildrenList] = useState<string[]>([]);

  // Get actual children from parent account
  useEffect(() => {
    if (auth.user?.email && auth.user?.role === "parent" && auth.getChildrenForParent) {
      const children = auth.getChildrenForParent(auth.user.email);
      const childNames = children.map(c => c.email.split("_")[0].replace(/([A-Z])/g, " $1").trim());
      setChildrenList(childNames);
      if (childNames.length > 0) {
        // Create default activity data for each child
        const defaultChild: ChildActivity = {
          name: childNames[0],
          points: 750 + Math.random() * 500,
          achievements: Math.floor(5 + Math.random() * 10),
          todayTime: `${Math.floor(0.5 + Math.random() * 2)}h ${Math.floor(Math.random() * 60)}m`,
          thisWeekTime: `${Math.floor(3 + Math.random() * 8)}h ${Math.floor(Math.random() * 60)}m`,
          lastActive: "Recently",
          learningModules: [
            { name: "Math Basics", progress: Math.floor(30 + Math.random() * 70) },
            { name: "Science Explorer", progress: Math.floor(20 + Math.random() * 80) },
            { name: "Reading Challenge", progress: Math.floor(10 + Math.random() * 90) }
          ],
          recentActivity: [
            { activity: "Completed Lesson", time: "Today", points: 50 },
            { activity: "Played Educational Game", time: "Yesterday", points: 75 }
          ]
        };
        setSelectedChild(defaultChild);
      }
    }
  }, [auth]);

  if (isChild) {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 min-h-screen">
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">
          Welcome, {childName}!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Here's your learning overview</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Points" value="1,250" />
          <StatCard title="Achievements" value="12 Badges" />
          <StatCard title="Active Time Today" value="1h 40m" />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">My Assignments</h2>
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 text-slate-600 dark:text-slate-300">
            <p>No pending assignments. Great job! 🎉</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Active Challenges</h2>
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 text-slate-600 dark:text-slate-300">
            <p>No active challenges at the moment. Check back soon! ⏰</p>
          </div>
        </div>
      </div>
    );
  }

  // Parent view - Overview of children's activities
  return (
    <div className="p-6 bg-white dark:bg-slate-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">
        Parent Dashboard
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">Monitor your children's learning and activities</p>

      {/* Children Selection */}
      <div className="mb-8 flex gap-3 flex-wrap">
        {childrenList.map((childName) => (
          <button
            key={childName}
            onClick={() => {
              const newChild: ChildActivity = {
                name: childName,
                points: 750 + Math.random() * 500,
                achievements: Math.floor(5 + Math.random() * 10),
                todayTime: `${Math.floor(0.5 + Math.random() * 2)}h ${Math.floor(Math.random() * 60)}m`,
                thisWeekTime: `${Math.floor(3 + Math.random() * 8)}h ${Math.floor(Math.random() * 60)}m`,
                lastActive: "Recently",
                learningModules: [
                  { name: "Math Basics", progress: Math.floor(30 + Math.random() * 70) },
                  { name: "Science Explorer", progress: Math.floor(20 + Math.random() * 80) },
                  { name: "Reading Challenge", progress: Math.floor(10 + Math.random() * 90) }
                ],
                recentActivity: [
                  { activity: "Completed Lesson", time: "Today", points: 50 },
                  { activity: "Played Educational Game", time: "Yesterday", points: 75 }
                ]
              };
              setSelectedChild(newChild);
            }}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              selectedChild?.name === childName
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {childName}
          </button>
        ))}
      </div>

      {selectedChild && (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Points" value={selectedChild.points.toString()} />
            <StatCard title="Achievements" value={`${selectedChild.achievements} Badges`} />
            <StatCard title="Today's Time" value={selectedChild.todayTime} />
            <StatCard title="This Week" value={selectedChild.thisWeekTime} />
          </div>

          {/* Learning Modules Progress */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Learning Module Progress</h2>
            <div className="space-y-4">
              {selectedChild.learningModules.map((module) => (
                <div key={module.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{module.name}</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
                    <div
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {selectedChild.recentActivity.map((activity, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-600 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{activity.activity}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{activity.time}</p>
                  </div>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full font-bold">
                    +{activity.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">Last active: {selectedChild.lastActive}</p>
        </>
      )}
    </div>
  );
};

export default ParentDashboard;
