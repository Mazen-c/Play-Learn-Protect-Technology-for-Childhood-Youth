import React, { createContext, useContext, useEffect, useState } from "react";

type Role = "parent" | "child" | "educator";

interface User {
  email: string;
  role: Role;
}

interface Account {
  email: string;
  role: Exclude<Role, "child"> | "child";
  password: string;
}

interface ResetToken { token: string; email: string; expires: number }

interface AuthContextValue {
  user: User | null;
  login: (email: string, role: Role, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, role: Exclude<Role, "child">, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<string>;
  completeReset: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem("plp_user");
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("plp_user", JSON.stringify(user));
    else localStorage.removeItem("plp_user");
  }, [user]);

  const fakeNetwork = (ms = 300) => new Promise(res => setTimeout(res, ms));

  const getAccounts = (): Account[] => {
    try {
      const raw = localStorage.getItem("plp_accounts");
      return raw ? (JSON.parse(raw) as Account[]) : [];
    } catch {
      return [];
    }
  };

  const saveAccounts = (accounts: Account[]) => {
    localStorage.setItem("plp_accounts", JSON.stringify(accounts));
  };

  const login = async (email: string, role: Role, password: string) => {
    await fakeNetwork();
    const accounts = getAccounts();
    const account = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (!account) throw new Error("No account found for this email. Please register.");
    if (account.role !== role) throw new Error(`Account role mismatch. Use the ${account.role} login.`);
    if (account.password !== password) throw new Error("Invalid password.");
    const u = { email: account.email, role: account.role } as User;
    setUser(u);
  };

  const logout = () => setUser(null);

  const register = async (email: string, role: Exclude<Role, "child">, password: string) => {
    await fakeNetwork();
    const accounts = getAccounts();
    const exists = accounts.some(a => a.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error("An account with this email already exists.");
    const acc: Account = { email, role, password };
    accounts.push(acc);
    saveAccounts(accounts);
    setUser({ email, role });
  };

  const getResetTokens = (): ResetToken[] => {
    try {
      const raw = localStorage.getItem("plp_reset_tokens");
      return raw ? (JSON.parse(raw) as ResetToken[]) : [];
    } catch {
      return [];
    }
  };

  const saveResetTokens = (tokens: ResetToken[]) => {
    localStorage.setItem("plp_reset_tokens", JSON.stringify(tokens));
  };

  const resetPassword = async (email: string) => {
    await fakeNetwork();
    const accounts = getAccounts();
    const account = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (!account) throw new Error("No account found for this email.");
    const token = Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
    const expires = Date.now() + 1000 * 60 * 60; // 1 hour
    const tokens = getResetTokens();
    tokens.push({ token, email: account.email, expires });
    saveResetTokens(tokens);
    // Return a frontend-accessible link for the simulated email
    return `${window.location.origin}/reset-password?token=${token}`;
  };

  const completeReset = async (token: string, newPassword: string) => {
    await fakeNetwork();
    const tokens = getResetTokens();
    const entry = tokens.find(t => t.token === token);
    if (!entry) throw new Error("Invalid or expired token.");
    if (entry.expires < Date.now()) throw new Error("Token expired.");
    const accounts = getAccounts();
    const idx = accounts.findIndex(a => a.email.toLowerCase() === entry.email.toLowerCase());
    if (idx === -1) throw new Error("Account not found for token.");
    accounts[idx].password = newPassword;
    saveAccounts(accounts);
    // remove used token
    saveResetTokens(tokens.filter(t => t.token !== token));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, resetPassword, completeReset }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export type { Role };
