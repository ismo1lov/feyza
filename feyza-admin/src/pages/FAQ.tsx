import { useState, useEffect } from "react";
import { toast } from "sonner";
import { HelpCircle, Plus, Pencil, Trash2, Save, X } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export default function FAQPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", sort_order: 0 });

  useEffect(() => {
    fetch("/api/faq")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => toast.error("Yuklashda xatolik"))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    if (!form.question || !form.answer) { toast.error("Savol va javob majburiy"); return; }
    const res = await fetch("/api/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) { toast.error("Qo'shishda xatolik"); return; }
    const data = await res.json();
    toast.success("Qo'shildi");
    setItems((prev) => [...prev, { ...form, id: data.id }]);
    setShowAdd(false);
    setForm({ question: "", answer: "", sort_order: 0 });
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const res = await fetch("/api/faq/update", {
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
    const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("O'chirishda xatolik"); return; }
    toast.success("O'chirildi");
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) return <div className="text-muted-foreground">Yuklanmoqda...</div>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-body font-bold">FAQ</h1>
          <p className="text-base text-foreground/70 mt-1">Savol-javoblarni boshqarish</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-200/50">
          <Plus className="w-4 h-4" /> Yangi
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-body font-bold">Yangi savol</h2>
            <button onClick={() => setShowAdd(false)}><X className="w-4 h-4" /></button>
          </div>
          <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Savol" className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder="Javob" rows={4} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          <button onClick={handleCreate} className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-200/50 flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Qo'shish
          </button>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-border p-5">
            {editing?.id === item.id ? (
              <div className="space-y-3">
                <input value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <textarea value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                <div className="flex gap-2">
                  <button onClick={handleUpdate} className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium text-sm"><Save className="w-3.5 h-3.5 inline mr-1" /> Saqlash</button>
                  <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl bg-muted text-muted-foreground font-medium text-sm"><X className="w-3.5 h-3.5 inline mr-1" /> Bekor</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{item.question}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.answer}</p>
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
