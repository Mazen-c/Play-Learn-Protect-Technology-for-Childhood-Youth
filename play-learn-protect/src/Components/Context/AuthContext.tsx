import React, { createContext, useContext, useEffect, useState } from "react";

type Role = "parent" | "child" | "educator";

interface User {
  email: string;
  role: Role;
  parentEmail?: string; // For child accounts, stores parent's email
}

interface Account {
  email: string;
  role: Exclude<Role, "child"> | "child";
  password: string;
  parentEmail?: string; // For child accounts
}

interface ChildAccount {
  name: string;
  email: string;
  parentEmail: string;
}

interface ModuleItem {
  id: number;
  title: string;
  description: string;
  createdBy: string; // teacher email
  createdAt: number;
}

interface ChallengeItem {
  id: number;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  reward?: number;
  createdBy: string;
  createdAt: number;
}

interface ResetToken { token: string; email: string; expires: number }

interface AuthContextValue {
  user: User | null;
  login: (email: string, role: Role, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, role: Exclude<Role, "child">, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<string>;
  completeReset: (token: string, newPassword: string) => Promise<void>;
  createChildAccount: (childName: string, parentEmail: string) => Promise<void>;
  getChildrenForParent: (parentEmail: string) => ChildAccount[];
  loginAsChild: (childEmail: string, parentEmail: string) => Promise<void>;
  switchToParent: () => void;
  addModule: (module: Omit<ModuleItem, "id" | "createdAt">) => ModuleItem;
  addChallenge: (ch: Omit<ChallengeItem, "id" | "createdAt">) => ChallengeItem;
  getModules: () => ModuleItem[];
  getChallenges: () => ChallengeItem[];
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

  const [parentSession, setParentSession] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem("plp_parent_session");
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("plp_user", JSON.stringify(user));
    else localStorage.removeItem("plp_user");
  }, [user]);

  useEffect(() => {
    if (parentSession) localStorage.setItem("plp_parent_session", JSON.stringify(parentSession));
    else localStorage.removeItem("plp_parent_session");
  }, [parentSession]);

  const fakeNetwork = (ms = 300) => new Promise(res => setTimeout(res, ms));

  const getModules = (): ModuleItem[] => {
    try {
      const raw = localStorage.getItem("plp_modules");
      return raw ? (JSON.parse(raw) as ModuleItem[]) : [];
    } catch {
      return [];
    }
  };

  const saveModules = (modules: ModuleItem[]) => {
    localStorage.setItem("plp_modules", JSON.stringify(modules));
  };

  const getChallenges = (): ChallengeItem[] => {
    try {
      const raw = localStorage.getItem("plp_challenges");
      return raw ? (JSON.parse(raw) as ChallengeItem[]) : [];
    } catch {
      return [];
    }
  };

  const saveChallenges = (chs: ChallengeItem[]) => {
    localStorage.setItem("plp_challenges", JSON.stringify(chs));
  };

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

  const createChildAccount = async (childName: string, parentEmail: string) => {
    await fakeNetwork();
    const accounts = getAccounts();
    const parent = accounts.find(a => a.email.toLowerCase() === parentEmail.toLowerCase());
    if (!parent) throw new Error("Parent account not found.");
    if (parent.role !== "parent") throw new Error("Only parent accounts can create children.");
    
    // Generate child email
    const childEmail = `${childName.toLowerCase().replace(/\s+/g, "")}_${Date.now()}@child.local`;
    const childAccount: Account = {
      email: childEmail,
      role: "child",
      password: "", // Children don't have their own password
      parentEmail: parent.email,
    };
    accounts.push(childAccount);
    saveAccounts(accounts);
  };

  const getChildrenForParent = (parentEmail: string): ChildAccount[] => {
    const accounts = getAccounts();
    return accounts
      .filter(a => a.role === "child" && a.parentEmail?.toLowerCase() === parentEmail.toLowerCase())
      .map(a => ({
        name: a.email.split("_")[0].replace(/([A-Z])/g, " $1").trim(),
        email: a.email,
        parentEmail: a.parentEmail || "",
      }));
  };

  const loginAsChild = async (childEmail: string, parentEmail: string) => {
    await fakeNetwork();
    const accounts = getAccounts();
    const childAccount = accounts.find(a => 
      a.email.toLowerCase() === childEmail.toLowerCase() && 
      a.role === "child" &&
      a.parentEmail?.toLowerCase() === parentEmail.toLowerCase()
    );
    if (!childAccount) throw new Error("Child account not found or not linked to this parent.");
    
    // Save parent session before switching to child
    const parentUser: User = { email: parentEmail, role: "parent" };
    setParentSession(parentUser);
    
    const u: User = {
      email: childAccount.email,
      role: "child",
      parentEmail: childAccount.parentEmail,
    };
    setUser(u);
  };

  const switchToParent = () => {
    if (parentSession) {
      setUser(parentSession);
      setParentSession(null);
    }
  };

  const addModule = (module: Omit<ModuleItem, "id" | "createdAt">): ModuleItem => {
    const modules = getModules();
    const item: ModuleItem = {
      id: Date.now(),
      title: module.title,
      description: module.description,
      createdBy: module.createdBy,
      createdAt: Date.now(),
    };
    modules.unshift(item);
    saveModules(modules);
    return item;
  };

  const addChallenge = (ch: Omit<ChallengeItem, "id" | "createdAt">): ChallengeItem => {
    const chs = getChallenges();
    const item: ChallengeItem = {
      id: Date.now(),
      title: ch.title,
      description: ch.description,
      startDate: ch.startDate,
      endDate: ch.endDate,
      reward: ch.reward,
      createdBy: ch.createdBy,
      createdAt: Date.now(),
    };
    chs.unshift(item);
    saveChallenges(chs);
    return item;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      resetPassword, 
      completeReset,
      createChildAccount,
      getChildrenForParent,
      loginAsChild,
      switchToParent,
      addModule,
      addChallenge,
      getModules,
      getChallenges,
    }}>
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
