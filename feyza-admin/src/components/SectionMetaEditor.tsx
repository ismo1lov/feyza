import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, Edit3 } from "lucide-react";

interface Props {
  section: string;
}

export default function SectionMetaEditor({ section }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/section-meta/${section}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title || "");
        setSubtitle(data.subtitle || "");
      })
      .catch(() => toast.error("Yuklashda xatolik"))
      .finally(() => setLoading(false));
  }, [section]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/section-meta/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle }),
      });
      if (!res.ok) throw new Error();
      toast.success("Section sarlavhalari saqlandi");
    } catch {
      toast.error("Saqlashda xatolik");
    }
    setSaving(false);
  };

  if (loading) return null;

  return (
    <div className="bg-white rounded-2xl border border-border p-4 md:p-6 space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-purple-400 flex items-center justify-center">
          <Edit3 className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-body font-bold text-sm">Section sarlavhalari</h3>
          <p className="text-xs text-foreground/70">Title va subtitleni o'zgartirish</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/80 mb-1.5">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/80 mb-1.5">Subtitle (label)</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-400 to-purple-400 text-white text-sm font-medium hover:from-violet-500 hover:to-purple-500 transition-all disabled:opacity-50"
      >
        <Save className="w-3.5 h-3.5" />
        {saving ? "Saqlanmoqda..." : "Saqlash"}
      </button>
    </div>
  );
}
