import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const MOCK_CREDENTIALS = {
  email: "mushtariy",
  password: "mushtariy123",
};

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
      setUser({ id: 1, email: MOCK_CREDENTIALS.email, name: "Admin" });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    if (email !== MOCK_CREDENTIALS.email || password !== MOCK_CREDENTIALS.password) {
      throw new Error("Email yoki parol noto'g'ri");
    }

    const fakeToken = "mock_token_feyza_aura_admin";
    localStorage.setItem("admin_token", fakeToken);
    setToken(fakeToken);
    setUser({ id: 1, email: MOCK_CREDENTIALS.email, name: "Admin" });
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
