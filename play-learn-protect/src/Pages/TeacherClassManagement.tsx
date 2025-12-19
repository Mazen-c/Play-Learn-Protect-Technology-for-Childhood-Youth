import React, { useState } from "react";

interface Student {
  id: number;
  name: string;
  progress: number;
}

interface ClassItem {
  id: number;
  name: string;
  grade: string;
  code: string;
  students: Student[];
}

const initialClasses: ClassItem[] = [
  {
    id: 1,
    name: "Grade 5 - A",
    grade: "Grade 5",
    code: "5A-X3K9",
    students: [
      { id: 1, name: "Ali Khan", progress: 70 },
      { id: 2, name: "Sara Noor", progress: 85 },
    ],
  },
  {
    id: 2,
    name: "Grade 6 - B",
    grade: "Grade 6",
    code: "6B-J8P2",
    students: [{ id: 3, name: "Omar Ali", progress: 60 }],
  },
];

const TeacherClassManagement: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(
    initialClasses[0]?.id ?? null,
  );
  const [newClassName, setNewClassName] = useState("");
  const [newClassGrade, setNewClassGrade] = useState("");
  const [newStudentName, setNewStudentName] = useState("");

  const selectedClass =
    classes.find((item) => item.id === selectedClassId) ?? classes[0];

  const handleCreateClass = () => {
    if (!newClassName.trim() || !newClassGrade.trim()) return;

    const next: ClassItem = {
      id: Date.now(),
      name: newClassName.trim(),
      grade: newClassGrade.trim(),
      code: generateCode(),
      students: [],
    };
    setClasses((prev) => [...prev, next]);
    setNewClassName("");
    setNewClassGrade("");
    setSelectedClassId(next.id);
  };

  const handleGenerateCode = () => {
    if (!selectedClass) return;
    const updated = classes.map((item) =>
      item.id === selectedClass.id
        ? { ...item, code: generateCode() }
        : item,
    );
    setClasses(updated);
  };

  const handleAddStudent = () => {
    if (!selectedClass || !newStudentName.trim()) return;

    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === selectedClass.id
          ? {
              ...cls,
              students: [
                ...cls.students,
                {
                  id: Date.now(),
                  name: newStudentName.trim(),
                  progress: 0,
                },
              ],
            }
          : cls,
      ),
    );
    setNewStudentName("");
  };

  const handleRemoveStudent = (studentId: number) => {
    if (!selectedClass) return;
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === selectedClass.id
          ? {
              ...cls,
              students: cls.students.filter(
                (student) => student.id !== studentId,
              ),
            }
          : cls,
      ),
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 text-slate-900 dark:text-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg">
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Class Management
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Create and edit classes, generate class codes, and manage students
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <section className="space-y-6 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/30">
                <svg className="h-5 w-5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Your Classes
              </h2>
            </div>

            <ul className="space-y-3">
              {classes.map((cls) => (
                <li key={cls.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all ${
                      selectedClass?.id === cls.id
                        ? "border-sky-500 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 text-sky-900 dark:text-sky-100 shadow-md"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700/50 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-sm">{cls.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {cls.grade}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                      {cls.students.length} students
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700/50 p-4">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Create New Class
                </p>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/20"
                  placeholder="Class name (e.g. Grade 7 - A)"
                  value={newClassName}
                  onChange={(event) => setNewClassName(event.target.value)}
                />
                <input
                  type="text"
                  className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/20"
                  placeholder="Grade (e.g. Grade 7)"
                  value={newClassGrade}
                  onChange={(event) => setNewClassGrade(event.target.value)}
                />
                <button
                  type="button"
                  onClick={handleCreateClass}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Class
                </button>
              </div>
            </div>
          </section>

          {selectedClass && (
            <section className="space-y-6 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {selectedClass.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {selectedClass.grade}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateCode}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:shadow-xl hover:shadow-sky-500/40 hover:scale-[1.02]"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Generate Code
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800 px-4 py-3">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Class Code:
                </span>
                <span className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 px-4 py-2 font-mono text-sm font-bold text-slate-900 dark:text-slate-100 tracking-wider">
                  {selectedClass.code}
                </span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(selectedClass.code)}
                  className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Copy code"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Students
                  </h3>
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    className="flex-1 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/20"
                    placeholder="Student full name"
                    value={newStudentName}
                    onChange={(event) =>
                      setNewStudentName(event.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={handleAddStudent}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                  </button>
                </div>

                <ul className="max-h-80 space-y-2 overflow-y-auto">
                  {selectedClass.students.map((student) => (
                    <li
                      key={student.id}
                      className="flex items-center justify-between rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800 px-4 py-3 transition-all hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
                          <span className="text-sm font-bold text-sky-600 dark:text-sky-400">
                            {student.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                            {student.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Progress: {student.progress}%
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStudent(student.id)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Remove student"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </li>
                  ))}
                  {selectedClass.students.length === 0 && (
                    <li className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-6 py-12 text-center">
                      <svg className="h-12 w-12 text-slate-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">No students yet</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Share the class code to invite students</p>
                    </li>
                  )}
                </ul>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

function generateCode(): string {
  const base = Math.random().toString(36).slice(2, 6).toUpperCase();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${base}-${suffix}`;
}

export default TeacherClassManagement;


