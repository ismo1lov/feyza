import { useState } from "react";
import { toast } from "sonner";
import { Save, Lock, User, Eye, EyeOff } from "lucide-react";

export default function Settings() {
  const [login, setLogin] = useState("mushtariy");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("Yangi parollar bir-biriga mos emas");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      toast.error("Parol kamida 6 belgidan iborat bo'lishi kerak");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    localStorage.setItem("admin_credentials", JSON.stringify({ login, password: newPassword || "mushtariy123" }));
    toast.success("Sozlamalar saqlandi!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-body font-bold">Sozlamalar</h1>
        <p className="text-base text-foreground/70 mt-1">Admin panel sozlamalari</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-border p-6 space-y-6 max-w-3xl mx-auto">
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
