import React from "react";

const mockStudent = {
  name: "Ali Khan",
  className: "Grade 5 - A",
  overallProgress: 72,
  modules: [
    { id: 1, title: "Cyber Safety Basics", status: "Completed", score: 95 },
    { id: 2, title: "Digital Footprint", status: "In progress", score: 70 },
    { id: 3, title: "Online Bullying", status: "Not started", score: null },
  ],
};

const TeacherStudentDetail: React.FC = () => {
  const student = mockStudent;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg">
              <span className="text-2xl font-bold text-white">
                {student.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {student.name}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{student.className}</p>
            </div>
          </div>
        </header>

        <section className="space-y-4 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/30">
              <svg className="h-5 w-5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Overall Progress
            </h2>
          </div>
          <div className="flex items-baseline gap-3">
            <p className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              {student.overallProgress}%
            </p>
            <span className="text-sm text-slate-500 dark:text-slate-400">complete</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 shadow-sm transition-all duration-500"
              style={{ width: `${student.overallProgress}%` }}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Module Progress
            </h2>
          </div>
          <ul className="space-y-3">
            {student.modules.map((module) => {
              const getStatusColor = () => {
                if (module.status === "Completed") return "from-emerald-500 to-green-600";
                if (module.status === "In progress") return "from-amber-500 to-orange-500";
                return "from-slate-400 to-slate-500";
              };
              return (
                <li
                  key={module.id}
                  className="flex items-center justify-between rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800 px-4 py-4 transition-all hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${getStatusColor()}`}>
                      {module.status === "Completed" ? (
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : module.status === "In progress" ? (
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                        {module.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {module.status}
                      </p>
                    </div>
                  </div>
                  {module.score != null && (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      Score: {module.score}%
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TeacherStudentDetail;


