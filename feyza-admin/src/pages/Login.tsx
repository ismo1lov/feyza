import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(30,50%,98%)] to-[hsl(340,40%,96%)] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-pink-100/10 to-rose-100/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 shadow-lg shadow-pink-200/50 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-body font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-base text-foreground/70 mt-2">Xush kelibsiz</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-pink-100/50 border border-white/50">
          {error && (
            <div className="bg-red-50/80 backdrop-blur border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-base font-medium text-foreground/80 mb-1.5">
                Login
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Login kiriting"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-pink-100 bg-white/80 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-200/50 focus:border-pink-300 transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-foreground/80 mb-1.5">
                Parol
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol kiriting"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-pink-100 bg-white/80 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-200/50 focus:border-pink-300 transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-2.5 rounded-xl font-medium hover:from-pink-500 hover:to-rose-500 transition-all disabled:opacity-50 shadow-lg shadow-pink-200/50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Kirish...
                </span>
              ) : "Kirish"}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground/60 mt-6">
            Demo: mushtariy / mushtariy123
          </p>
        </div>
      </div>
    </div>
  );
}
