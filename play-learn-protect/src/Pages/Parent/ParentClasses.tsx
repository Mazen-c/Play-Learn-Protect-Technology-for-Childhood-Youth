import React from "react";

interface ChildClass {
  id: number;
  childName: string;
  className: string;
  progress: number;
  teacher: string;
}

const mockClasses: ChildClass[] = [
  { id: 1, childName: "Ali", className: "Grade 5 - A", progress: 75, teacher: "Ms. Sarah" },
  { id: 2, childName: "Ali", className: "Grade 5 - B", progress: 60, teacher: "Mr. Ahmed" },
  { id: 3, childName: "Mona", className: "Grade 4 - A", progress: 85, teacher: "Ms. Sarah" },
];

const ParentClasses: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            My Children's Classes
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View your children's enrolled classes and their progress.
          </p>
        </header>

        <div className="grid gap-6">
          {mockClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {classItem.childName} - {classItem.className}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Teacher: {classItem.teacher}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Class Progress
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {classItem.progress}%
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${classItem.progress}%` }}
                  />
                </div>
              </div>

              <button className="mt-4 w-full rounded-md bg-slate-100 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600">
                View Details
              </button>
            </div>
          ))}
        </div>

        {mockClasses.length === 0 && (
          <div className="rounded-xl bg-white dark:bg-slate-800 p-12 text-center shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              No classes found. Your children will appear here once they're enrolled in a class.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentClasses;
