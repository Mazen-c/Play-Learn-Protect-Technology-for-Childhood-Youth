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
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <header>
          <h1 className="text-2xl font-semibold text-slate-900">
            {student.name}
          </h1>
          <p className="text-sm text-slate-500">{student.className}</p>
        </header>

        <section className="space-y-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Overall progress
              </p>
              <p className="text-2xl font-semibold text-slate-900">
                {student.overallProgress}%
              </p>
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-sky-500"
              style={{ width: `${student.overallProgress}%` }}
            />
          </div>
        </section>

        <section className="space-y-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">
            Module progress
          </h2>
          <ul className="space-y-2 text-xs">
            {student.modules.map((module) => (
              <li
                key={module.id}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {module.title}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {module.status}
                  </p>
                </div>
                {module.score != null && (
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    Score: {module.score}%
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TeacherStudentDetail;


