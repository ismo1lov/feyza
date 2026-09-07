import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Star, Plus, Pencil, Trash2, Save, X } from "lucide-react";
import SectionMetaEditor from "@admin/components/SectionMetaEditor";

interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  sort_order: number;
}

export default function ReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [form, setForm] = useState({ name: "", text: "", rating: 5, sort_order: 0 });

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => toast.error("Yuklashda xatolik"))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    if (!form.name || !form.text) { toast.error("Ism va matn majburiy"); return; }
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) { toast.error("Qo'shishda xatolik"); return; }
    const data = await res.json();
    toast.success("Qo'shildi");
    setItems((prev) => [...prev, { ...form, id: data.id }]);
    setShowAdd(false);
    setForm({ name: "", text: "", rating: 5, sort_order: 0 });
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const res = await fetch("/api/reviews/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (!res.ok) { toast.error("Saqlashda xatolik"); return; }
    toast.success("Yangilandi");
    setItems((prev) => prev.map((i) => (i.id === editing.id ? editing : i)));
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("O'chirishda xatolik"); return; }
    toast.success("O'chirildi");
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) return <div className="text-muted-foreground">Yuklanmoqda...</div>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-body font-bold">Mijozlar fikri</h1>
          <p className="text-sm md:text-base text-foreground/70 mt-1">Sharhlarni boshqarish</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-200/50 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Yangi
        </button>
      </div>

      <SectionMetaEditor section="reviews" />

      {showAdd && (
        <div className="bg-white rounded-2xl border border-border p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-body font-bold">Yangi fikr</h2>
            <button onClick={() => setShowAdd(false)}><X className="w-4 h-4" /></button>
          </div>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ism" className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Fikr" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/80">Baho:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                <Star className={`w-5 h-5 ${n <= form.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
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
                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <textarea value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setEditing({ ...editing, rating: n })}>
                      <Star className={`w-4 h-4 ${n <= editing.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={handleUpdate} className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium text-sm"><Save className="w-3.5 h-3.5 inline mr-1" /> Saqlash</button>
                  <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl bg-muted text-muted-foreground font-medium text-sm"><X className="w-3.5 h-3.5 inline mr-1" /> Bekor</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setEditing(item)} className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
