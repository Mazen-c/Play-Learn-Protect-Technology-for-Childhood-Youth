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
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Class management
          </h1>
          <p className="text-sm text-slate-500">
            Create and edit classes, generate class codes, and manage students.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <section className="space-y-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              Your classes
            </h2>

            <ul className="space-y-2 text-sm">
              {classes.map((cls) => (
                <li key={cls.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition ${
                      selectedClass?.id === cls.id
                        ? "border-sky-500 bg-sky-50 text-sky-900"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-xs text-slate-500">
                        {cls.grade}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500">
                      {cls.students.length} students
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 rounded-lg bg-slate-50 p-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Create new class
              </p>
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Class name (e.g. Grade 7 - A)"
                  value={newClassName}
                  onChange={(event) => setNewClassName(event.target.value)}
                />
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Grade (e.g. Grade 7)"
                  value={newClassGrade}
                  onChange={(event) => setNewClassGrade(event.target.value)}
                />
                <button
                  type="button"
                  onClick={handleCreateClass}
                  className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                >
                  Add class
                </button>
              </div>
            </div>
          </section>

          {selectedClass && (
            <section className="space-y-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    {selectedClass.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {selectedClass.grade}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateCode}
                  className="inline-flex items-center rounded-md bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
                >
                  Generate class code
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-xs font-medium text-slate-500">
                  Class code:
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs">
                  {selectedClass.code}
                </span>
              </div>

              <div className="space-y-3 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Students
                  </h3>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Student full name"
                    value={newStudentName}
                    onChange={(event) =>
                      setNewStudentName(event.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={handleAddStudent}
                    className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                  >
                    Add
                  </button>
                </div>

                <ul className="max-h-64 space-y-1.5 overflow-y-auto text-xs">
                  {selectedClass.students.map((student) => (
                    <li
                      key={student.id}
                      className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5"
                    >
                      <div>
                        <p className="font-medium text-slate-900">
                          {student.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Progress: {student.progress}%
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStudent(student.id)}
                        className="text-[11px] text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                  {selectedClass.students.length === 0 && (
                    <li className="text-xs text-slate-400">
                      No students yet. Share the class code to invite
                      students.
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


