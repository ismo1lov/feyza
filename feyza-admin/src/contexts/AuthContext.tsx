import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "@/lib/api";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("admin_token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.auth.me()
        .then((data) => {
          setUser(data.user);
          setIsLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("admin_token");
          setToken(null);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await api.auth.login({ login: email, password });
    localStorage.setItem("admin_token", res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
