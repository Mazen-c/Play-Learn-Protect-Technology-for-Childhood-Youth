import React, { useState } from "react";

const mockClasses = [
  { id: 1, name: "Grade 5 - A" },
  { id: 2, name: "Grade 6 - B" },
];

const mockStudents = [
  { id: 1, name: "Ali Khan", classId: 1 },
  { id: 2, name: "Sara Noor", classId: 1 },
  { id: 3, name: "Omar Ali", classId: 2 },
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
  const [assignmentType, setAssignmentType] = useState<"class" | "student">("class");
  const [selectedStudentId, setSelectedStudentId] = useState<number | "">("");

  const handleAssign = () => {
    if (assignmentType === "class") {
      if (!selectedClassId || !selectedModuleId || !dueDate) return;
      // eslint-disable-next-line no-alert
      alert(`Module assigned to class (connect to backend here).`);
    } else {
      if (!selectedStudentId || !selectedModuleId || !dueDate) return;
      // eslint-disable-next-line no-alert
      alert(`Module assigned to student (connect to backend here).`);
    }
  };

  const filteredStudents = selectedClassId
    ? mockStudents.filter((s) => s.classId === selectedClassId)
    : [];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 text-slate-900 dark:text-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg">
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Assign Learning Modules
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Assign learning modules to classes or individual students and track completion progress
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <section className="space-y-6 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/30">
                <svg className="h-5 w-5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                New Assignment
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Assignment Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAssignmentType("class");
                      setSelectedStudentId("");
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      assignmentType === "class"
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 scale-[1.02]"
                        : "bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    To Class
                  </button>
                  <button
                    type="button"
                    onClick={() => setAssignmentType("student")}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      assignmentType === "student"
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 scale-[1.02]"
                        : "bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    To Student
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {assignmentType === "class" ? "Class" : "Class (to select student)"}
                  </label>
                  <select
                    className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/20"
                    value={selectedClassId}
                    onChange={(event) => {
                      setSelectedClassId(
                        event.target.value
                          ? Number(event.target.value)
                          : "",
                      );
                      setSelectedStudentId("");
                    }}
                  >
                    <option value="">Select a class</option>
                    {mockClasses.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                {assignmentType === "student" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Student
                    </label>
                    <select
                      className={`w-full rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-4 ${
                        !selectedClassId
                          ? "border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                          : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-sky-500 focus:ring-sky-500/20"
                      }`}
                      value={selectedStudentId}
                      onChange={(event) =>
                        setSelectedStudentId(
                          event.target.value
                            ? Number(event.target.value)
                            : "",
                        )
                      }
                      disabled={!selectedClassId}
                    >
                      <option value="">Select a student</option>
                      {filteredStudents.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                    </select>
                    {!selectedClassId && (
                      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                        Please select a class first
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Learning Module
                  </label>
                  <select
                    className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/20"
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
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/20"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAssign}
              disabled={!selectedModuleId || !dueDate || (assignmentType === "class" ? !selectedClassId : !selectedStudentId)}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:shadow-xl hover:shadow-sky-500/40 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              Assign Module {assignmentType === "class" ? "to Class" : "to Student"}
            </button>
          </section>

          <section className="space-y-6 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Assignment Completion
              </h2>
            </div>
            <ul className="space-y-4">
              {mockProgress.map((row) => {
                const pct = Math.round((row.completed / row.total) * 100);
                const getProgressColor = () => {
                  if (pct >= 80) return "from-emerald-500 to-green-600";
                  if (pct >= 50) return "from-amber-500 to-orange-500";
                  return "from-red-500 to-pink-600";
                };
                return (
                  <li
                    key={row.id}
                    className="space-y-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800 px-4 py-4 transition-all hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                          {row.module}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{row.className}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {pct}%
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {row.completed}/{row.total} students
                        </span>
                      </div>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 shadow-inner">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${getProgressColor()} shadow-sm transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
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


