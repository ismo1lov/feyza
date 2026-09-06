import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Image, Plus, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";
import SectionMetaEditor from "@/components/SectionMetaEditor";

interface GalleryItem {
  id: number;
  image_url: string;
  alt_text: string;
  sort_order: number;
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => toast.error("Yuklashda xatolik"))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const b64 = await readFileAsBase64(file);
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: b64, alt_text: "", sort_order: 0 }),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); toast.error(err.error || "Xatolik"); return; }
      toast.success("Qo'shildi");
      fetch("/api/gallery").then((r) => r.json()).then(setItems);
    } catch { toast.error("Rasm yuklanmadi"); }
    setUploading(false);
    e.target.value = "";
  };

  const handleEditFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    try {
      const b64 = await readFileAsBase64(file);
      setEditing({ ...editing, image_url: b64 });
    } catch { toast.error("Rasm o'qilmadi"); }
    e.target.value = "";
  };

  const handleEditSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch("/api/gallery/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) { toast.error("Saqlashda xatolik"); return; }
      toast.success("Yangilandi");
      setItems((prev) => prev.map((i) => (i.id === editing.id ? editing : i)));
      setEditing(null);
    } catch { toast.error("Saqlashda xatolik"); }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("O'chirishda xatolik"); return; }
    toast.success("O'chirildi");
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) return <div className="text-muted-foreground">Yuklanmoqda...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-body font-bold">Galereya</h1>
          <p className="text-sm md:text-base text-foreground/70 mt-1">Rasmlarni boshqarish</p>
        </div>
        <input type="file" accept="image/*" ref={fileRef} onChange={handleAdd} className="hidden" />
        <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-200/50 self-start sm:self-auto">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Yangi
        </button>
      </div>

      <SectionMetaEditor section="gallery" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-border overflow-hidden">
            {editing?.id === item.id ? (
              <div className="p-4 space-y-3">
                <input type="file" accept="image/*" ref={editFileRef} onChange={handleEditFileChange} className="hidden" />
                <button type="button" onClick={() => editFileRef.current?.click()} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/30 text-sm text-muted-foreground w-full">
                  <Plus className="w-3.5 h-3.5" /> Fayl tanlash
                </button>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  {editing.image_url && <img src={editing.image_url} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex gap-2">
                  <button onClick={handleEditSave} disabled={saving} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-400 to-rose-400 text-white text-sm font-medium">
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1" /> : <Save className="w-3.5 h-3.5 inline mr-1" />} Saqlash
                  </button>
                  <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm"><X className="w-3.5 h-3.5 inline mr-1" /> Bekor</button>
                </div>
              </div>
            ) : (
              <>
                <div className="aspect-video bg-muted">
                  <img src={item.image_url} alt={item.alt_text} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ""; }} />
                </div>
                <div className="p-3 md:p-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">{item.image_url}</p>
                  <div className="flex gap-1">
                    <button onClick={() => setEditing(item)} className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
