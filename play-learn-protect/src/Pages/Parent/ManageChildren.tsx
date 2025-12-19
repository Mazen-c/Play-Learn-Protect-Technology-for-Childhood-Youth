import React, { useState } from "react";
import { useAuth } from "../../Components/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ManageChildren: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [childName, setChildName] = useState("");
  const [children, setChildren] = useState(auth.getChildrenForParent(auth.user?.email || ""));
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!childName.trim()) {
      setError("Child name is required");
      return;
    }

    try {
      await auth.createChildAccount(childName.trim(), auth.user?.email || "");
      setSuccess(`Child account "${childName}" created successfully!`);
      setChildName("");
      setChildren(auth.getChildrenForParent(auth.user?.email || ""));
    } catch (err: any) {
      setError(err?.message || "Failed to create child account");
    }
  };

  const handleLoginAsChild = async (childEmail: string) => {
    try {
      await auth.loginAsChild(childEmail, auth.user?.email || "");
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Failed to login as child");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 px-4 py-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Manage Children
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create and manage your children's accounts.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          {/* Create Child Form */}
          <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Create New Child Account
            </h2>

            <form onSubmit={handleCreateChild} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  Child's Name
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g., Ali"
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-600 dark:text-green-400">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600"
              >
                Create Child Account
              </button>
            </form>
          </div>

          {/* Children List */}
          <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              My Children
            </h2>

            {children.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">
                No children created yet. Create one on the left!
              </p>
            ) : (
              <ul className="space-y-3">
                {children.map((child) => (
                  <li
                    key={child.email}
                    className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 p-4"
                  >
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {child.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {child.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleLoginAsChild(child.email)}
                      className="rounded-md bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
                    >
                      View
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageChildren;
