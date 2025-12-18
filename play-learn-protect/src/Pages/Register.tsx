import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<"parent" | "educator">("parent");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError(null);
      await auth.register(email, role, password);
      if (role === "parent") navigate("/");
      else navigate("/teacher/dashboard");
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Create account</h2>
        <form onSubmit={onSubmit}>
          <label className="block text-sm font-medium">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded mb-3" placeholder="you@example.com" />

          <label className="block text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded mb-3" placeholder="Choose a password" />
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

          <label className="block text-sm font-medium">Account Type</label>
          <select value={role} onChange={e => setRole(e.target.value as any)} className="w-full border p-2 rounded mb-4">
            <option value="parent">Parent</option>
            <option value="educator">Educator</option>
          </select>

          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          <a href="/login" className="text-blue-600">Already have an account? Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
