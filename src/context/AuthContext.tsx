"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  city?: string;
  state?: string;
  points: number;
  level: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "@ReUse:user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    const authUser: AuthUser = {
      id: "user-1",
      name: email.split("@")[0] === "joao" ? "João Verde" : "Usuário ReUse",
      email,
      city: "Campinas",
      state: "SP",
      points: 1240,
      level: "Guardião",
    };
    if (email.toLowerCase().includes("maria")) {
      authUser.id = "user-2";
      authUser.name = "Maria Silva";
      authUser.points = 890;
      authUser.level = "Protetor";
      authUser.city = "São Paulo";
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return true;
  };

  const register = async (name: string, email: string, _password: string) => {
    const authUser: AuthUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      city: "Campinas",
      state: "SP",
      points: 0,
      level: "Iniciante",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
