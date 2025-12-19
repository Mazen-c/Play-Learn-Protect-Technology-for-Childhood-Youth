import React, { useState } from "react";

const mockClasses = [
  { id: 1, name: "Grade 5 - A" },
  { id: 2, name: "Grade 6 - B" },
];

const mockModules = [
  { id: 1, title: "Cyber Safety Basics", duration: "20 min" },
  { id: 2, title: "Digital Footprint", duration: "15 min" },
  { id: 3, title: "Online Bullying", duration: "25 min" },
];

const mockProgress = [
  {
    id: 1,
    className: "Grade 5 - A",
    module: "Cyber Safety Basics",
    completed: 18,
    total: 22,
  },
  {
    id: 2,
    className: "Grade 6 - B",
    module: "Digital Footprint",
    completed: 15,
    total: 20,
  },
];

const TeacherAssignments: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState<number | "">(
    mockClasses[0]?.id ?? "",
  );
  const [selectedModuleId, setSelectedModuleId] = useState<number | "">(
    mockModules[0]?.id ?? "",
  );
  const [dueDate, setDueDate] = useState("");

  const handleAssign = () => {
    if (!selectedClassId || !selectedModuleId || !dueDate) return;

    // Placeholder for backend integration.
    // eslint-disable-next-line no-alert
    alert("Assignment created (connect to backend here).");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Assign learning modules
          </h1>
          <p className="text-sm text-slate-500">
            Assign learning modules to classes and track completion
            progress.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <section className="space-y-4 rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <h2 className="text-sm font-semibold text-slate-900">
              New assignment
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Class
                </label>
                <select
                  className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  value={selectedClassId}
                  onChange={(event) =>
                    setSelectedClassId(
                      event.target.value
                        ? Number(event.target.value)
                        : "",
                    )
                  }
                >
                  {mockClasses.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Module
                </label>
                <select
                  className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  value={selectedModuleId}
                  onChange={(event) =>
                    setSelectedModuleId(
                      event.target.value
                        ? Number(event.target.value)
                        : "",
                    )
                  }
                >
                  {mockModules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.title} ({module.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Due date
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleAssign}
              className="inline-flex items-center rounded-md bg-sky-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
            >
              Assign module
            </button>
          </section>

          <section className="space-y-4 rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <h2 className="text-sm font-semibold text-slate-900">
              Assignment completion
            </h2>
            <ul className="space-y-3 text-xs">
              {mockProgress.map((row) => {
                const pct = Math.round((row.completed / row.total) * 100);
                return (
                  <li
                    key={row.id}
                    className="space-y-1 rounded-lg bg-slate-50 px-3 py-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">
                          {row.module}
                        </p>
                        <p className="text-slate-500">{row.className}</p>
                      </div>
                      <span className="text-slate-600">
                        {row.completed}/{row.total} students
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-sky-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Completion: {pct}%
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignments;


