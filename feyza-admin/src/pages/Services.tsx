import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Sparkles, Plus, Pencil, Trash2, Save, X } from "lucide-react";
import SectionMetaEditor from "@/components/SectionMetaEditor";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
}

export default function Services() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", icon: "Sparkles", sort_order: 0 });

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => toast.error("Xizmatlarni yuklashda xatolik"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    const res = await fetch("/api/services/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (!res.ok) { toast.error("Saqlashda xatolik"); return; }
    toast.success("Yangilandi");
    const updated = editing;
    setEditing(null);
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  };

  const handleCreate = async () => {
    if (!form.title) { toast.error("Title majburiy"); return; }
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) { toast.error("Qo'shishda xatolik"); return; }
    const data = await res.json();
    toast.success("Qo'shildi");
    setItems((prev) => [...prev, { ...form, id: data.id }]);
    setShowAdd(false);
    setForm({ title: "", description: "", icon: "Sparkles", sort_order: 0 });
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("O'chirishda xatolik"); return; }
    toast.success("O'chirildi");
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) return <div className="text-muted-foreground">Yuklanmoqda...</div>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-body font-bold">Xizmatlar</h1>
          <p className="text-sm md:text-base text-foreground/70 mt-1">Xizmatlarni boshqarish</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-200/50 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Yangi
        </button>
      </div>

      <SectionMetaEditor section="services" />

      {showAdd && (
        <div className="bg-white rounded-2xl border border-border p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-body font-bold">Yangi xizmat</h2>
            <button onClick={() => setShowAdd(false)}><X className="w-4 h-4" /></button>
          </div>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Nomi" className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Tavsifi" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          <button onClick={handleCreate} className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-200/50 flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Qo'shish
          </button>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-border p-4 md:p-5">
            {editing?.id === item.id ? (
              <div className="space-y-3">
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                <input value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: +e.target.value })} type="number" className="w-24 px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <div className="flex gap-2">
                  <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium text-sm"><Save className="w-3.5 h-3.5" /> Saqlash</button>
                  <button onClick={() => setEditing(null)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-muted-foreground font-medium text-sm"><X className="w-3.5 h-3.5" /> Bekor</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-auto">
                  <button onClick={() => setEditing(item)} className="p-2 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-xl hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
