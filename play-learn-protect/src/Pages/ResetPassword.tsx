import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) setError("Missing token in URL.");
  }, [token]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await auth.completeReset(token, password);
      setDone(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err: any) {
      setError(err?.message || "Reset failed");
    }
  };

  if (done) return <div className="p-6">Password reset — redirecting to login...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Set a new password</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <form onSubmit={onSubmit}>
          <label className="block text-sm font-medium">New password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full border p-2 rounded mb-3" />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Set password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
