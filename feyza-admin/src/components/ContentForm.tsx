import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Globe, Save } from "lucide-react";

interface ContentData {
  heroTitle: string;
  heroSubtitle: string;
  buttonText: string;
}

export default function ContentForm() {
  const [form, setForm] = useState<ContentData>({
    heroTitle: "",
    heroSubtitle: "",
    buttonText: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data: ContentData) => {
        setForm(data);
        setFetching(false);
      })
      .catch(() => {
        toast.error("Kontentni yuklashda xatolik");
        setFetching(false);
      });
  }, []);

  const handleChange = (field: keyof ContentData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Saqlashda xatolik");
      toast.success("Muvaffaqiyatli yangilandi!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded-xl" />
          <div className="h-10 w-full bg-muted rounded-xl" />
          <div className="h-10 w-full bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-400 flex items-center justify-center">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-body font-bold">Sayt kontentini boshqarish</h2>
          <p className="text-sm text-foreground/70">Asosiy sahifa matnlarini o'zgartiring</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-medium text-primary mb-2">Sarlavha</label>
          <input
            type="text"
            value={form.heroTitle}
            onChange={handleChange("heroTitle")}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-primary mb-2">Kichik sarlavha</label>
          <textarea
            rows={3}
            value={form.heroSubtitle}
            onChange={handleChange("heroSubtitle")}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-primary mb-2">Tugma matni</label>
          <input
            type="text"
            value={form.buttonText}
            onChange={handleChange("buttonText")}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-2.5 rounded-xl font-medium hover:from-pink-500 hover:to-rose-500 transition-all disabled:opacity-50 shadow-lg shadow-pink-200/50 flex items-center justify-center gap-2"
        >
          {loading ? (
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
