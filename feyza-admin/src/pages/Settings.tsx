import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, Lock, User, Eye, EyeOff, Globe } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [siteName, setSiteName] = useState("");
  const [login, setLogin] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingSite, setSavingSite] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.site_name) setSiteName(data.site_name);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user?.email) setLogin(user.email);
  }, [user]);

  const handleSaveSite = async () => {
    if (!siteName.trim()) {
      toast.error("Sayt nomi bo'sh bo'lishi mumkin emas");
      return;
    }
    setSavingSite(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: { site_name: siteName } }),
      });
      if (!res.ok) throw new Error();
      toast.success("Sayt nomi saqlandi");
    } catch {
      toast.error("Saqlashda xatolik");
    }
    setSavingSite(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Joriy parolni kiriting");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("Yangi parollar bir-biriga mos emas");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      toast.error("Parol kamida 6 belgidan iborat bo'lishi kerak");
      return;
    }
    setSaving(true);
    try {
      const res = await api.auth.changePassword({
        currentPassword,
        newPassword: newPassword || currentPassword,
        login,
      });
      if (res.token) {
        localStorage.setItem("admin_token", res.token);
      }
      toast.success("Sozlamalar saqlandi!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Joriy parol noto'g'ri yoki xatolik yuz berdi");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl md:text-2xl font-body font-bold">Sozlamalar</h1>
        <p className="text-sm md:text-base text-foreground/70 mt-1">Admin panel sozlamalari</p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-400 flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-body font-bold">Sayt sozlamalari</h2>
            <p className="text-sm text-foreground/70">Sayt nomini o'zgartirish</p>
          </div>
        </div>

        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">Sayt nomi</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={handleSaveSite}
            disabled={savingSite}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-400 text-white text-sm font-medium hover:from-sky-500 hover:to-blue-500 transition-all disabled:opacity-50 flex items-center gap-2 shrink-0"
          >
            <Save className="w-3.5 h-3.5" />
            {savingSite ? "..." : "Saqlash"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-border p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-body font-bold">Xavfsizlik</h2>
            <p className="text-sm text-foreground/70">Login va parolni o'zgartirish</p>
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-foreground/80 mb-2">
            <User className="w-3.5 h-3.5 inline mr-1.5" />
            Login
          </label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-foreground/80 mb-2">Joriy parol</label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground/70"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-foreground/80 mb-2">Yangi parol</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Agar o'zgartirmoqchi bo'lsangiz"
              className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground/70"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-foreground/80 mb-2">Yangi parolni tasdiqlang</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Agar o'zgartirmoqchi bo'lsangiz"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-2.5 rounded-xl font-medium hover:from-pink-500 hover:to-rose-500 transition-all disabled:opacity-50 shadow-lg shadow-pink-200/50 flex items-center justify-center gap-2"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saqlanmoqda...
            </span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Saqlash
            </>
          )}
        </button>
      </form>
    </div>
  );
}
