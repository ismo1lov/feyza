import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, Phone, MapPin, Send, Globe } from "lucide-react";

interface ContactData {
  phone: string;
  telegram: string;
  telegram_link: string;
  instagram: string;
  instagram_link: string;
  location: string;
}

const DEFAULTS: ContactData = {
  phone: "+998 99 723 21 32",
  telegram: "@Feyza_aura",
  telegram_link: "https://t.me/Feyza_aura",
  instagram: "@feyza_aura",
  instagram_link: "https://www.instagram.com/feyza_aura/",
  location: "Toshkent, O'zbekiston",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => setForm({ ...DEFAULTS, ...data }))
      .catch(() => { setForm(DEFAULTS); toast.error("Yuklashda xatolik"); })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof ContactData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => prev ? { ...prev, [field]: e.target.value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      const res = await fetch("/api/contact/update", {
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
          <div className="h-10 w-full bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-body font-bold">Kontakt</h1>
        <p className="text-base text-foreground/70 mt-1">Kontakt ma'lumotlarini o'zgartirish</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-body font-bold">Aloqa ma'lumotlari</h2>
            <p className="text-sm text-foreground/70">Telefon, ijtimoiy tarmoqlar va manzil</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-medium text-foreground/80 mb-2">
              <Phone className="w-3.5 h-3.5 inline mr-1.5" /> Telefon
            </label>
            <input type="text" value={form.phone} onChange={handleChange("phone")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div>
            <label className="block text-base font-medium text-foreground/80 mb-2">
              <Send className="w-3.5 h-3.5 inline mr-1.5" /> Telegram
            </label>
            <input type="text" value={form.telegram} onChange={handleChange("telegram")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-base font-medium text-foreground/80 mb-2">Telegram havola</label>
            <input type="text" value={form.telegram_link} onChange={handleChange("telegram_link")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div>
            <label className="block text-base font-medium text-foreground/80 mb-2">Instagram</label>
            <input type="text" value={form.instagram} onChange={handleChange("instagram")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div>
            <label className="block text-base font-medium text-foreground/80 mb-2">Instagram havola</label>
            <input type="text" value={form.instagram_link} onChange={handleChange("instagram_link")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-base font-medium text-foreground/80 mb-2">
              <MapPin className="w-3.5 h-3.5 inline mr-1.5" /> Manzil
            </label>
            <input type="text" value={form.location} onChange={handleChange("location")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
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
