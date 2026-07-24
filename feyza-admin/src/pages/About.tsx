import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, BookOpen } from "lucide-react";

interface AboutData {
  title: string;
  description: string;
  value1_title: string;
  value1_desc: string;
  value2_title: string;
  value2_desc: string;
  value3_title: string;
  value3_desc: string;
}

export default function About() {
  const [form, setForm] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then(setForm)
      .catch(() => toast.error("Yuklashda xatolik"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof AboutData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => prev ? { ...prev, [field]: e.target.value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      const res = await fetch("/api/about/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Saqlashda xatolik");
      toast.success("Muvaffaqiyatli yangilandi!");
    } catch {
      toast.error("Xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-border p-6 animate-pulse space-y-4">
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded-xl" />
          <div className="h-20 w-full bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-body font-bold">Bizning tarix</h1>
        <p className="text-base text-foreground/70 mt-1">Tarix bo'limi ma'lumotlarini o'zgartirish</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-body font-bold">Asosiy ma'lumotlar</h2>
            <p className="text-sm text-foreground/70">Sarlavha va tavsif</p>
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-foreground/80 mb-2">Sarlavha</label>
          <input type="text" value={form.title} onChange={handleChange("title")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>

        <div>
          <label className="block text-base font-medium text-foreground/80 mb-2">Tavsif</label>
          <textarea rows={4} value={form.description} onChange={handleChange("description")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
              <p className="font-medium text-sm text-foreground/80">Qiymat {i}</p>
              <input type="text" value={form[`value${i}_title` as keyof AboutData] as string} onChange={handleChange(`value${i}_title` as keyof AboutData)} placeholder="Sarlavha" className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <textarea rows={2} value={form[`value${i}_desc` as keyof AboutData] as string} onChange={handleChange(`value${i}_desc` as keyof AboutData)} placeholder="Tavsif" className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
          ))}
        </div>

        <button type="submit" disabled={saving} className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-2.5 rounded-xl font-medium hover:from-pink-500 hover:to-rose-500 transition-all disabled:opacity-50 shadow-lg shadow-pink-200/50 flex items-center justify-center gap-2">
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saqlanmoqda...
            </span>
          ) : (
            <><Save className="w-4 h-4" /> Saqlash</>
          )}
        </button>
      </form>
    </div>
  );
}
