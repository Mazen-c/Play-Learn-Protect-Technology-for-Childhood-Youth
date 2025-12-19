import React, { useState } from "react";
import { useAuth } from "../Components/Context/AuthContext";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const auth = useAuth();

  const [link, setLink] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const l = await auth.resetPassword(email);
      setLink(l);
      setSent(true);
    } catch (err: any) {
      setSent(false);
      setLink(null);
      alert(err?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Reset password</h2>
        {sent ? (
          <div>
            <div className="text-green-600 mb-3">Reset link generated.</div>
            {link && (
              <div className="mb-3">
                <div className="text-sm mb-1">Simulated email link (click to use):</div>
                <a className="text-blue-600 break-all" href={link}>{link}</a>
              </div>
            )}
            <div className="text-sm">You can copy the link above or send it via your email client:</div>
            {link && (
              <div className="mt-2">
                <a className="inline-block bg-blue-600 text-white px-3 py-2 rounded" href={`mailto:${email}?subject=Password%20reset&body=Use%20this%20link%20to%20reset%20your%20password:%20${encodeURIComponent(link)}`}>Open mail client</a>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <label className="block text-sm font-medium">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded mb-3" placeholder="you@example.com" />
            <button type="submit" className="w-full bg-yellow-600 text-white p-2 rounded">Send reset link</button>
          </form>
        )}
        <div className="mt-4 text-sm">
          <a href="/login" className="text-blue-600">Back to sign in</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
