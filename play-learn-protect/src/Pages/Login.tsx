import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState("parent");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError(null);
      await auth.login(email, role as any, password);
      if (role === "parent") navigate("/");
      else if (role === "educator") navigate("/teacher/dashboard");
      else navigate("/child/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <form onSubmit={onSubmit}>
          <label className="block text-sm font-medium">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 p-2 rounded mb-3" placeholder="you@example.com" />

          <label className="block text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 p-2 rounded mb-3" placeholder="Enter password" />
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

          <label className="block text-sm font-medium">Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 p-2 rounded mb-4">
            <option value="parent">Parent</option>
            <option value="educator">Educator</option>
          </select>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-4 text-sm flex justify-between">
          <a href="/forgot-password" className="text-blue-600">Forgot password?</a>
          <a href="/register" className="text-blue-600">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
