import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Send, Trash2, Phone, User, MessageSquare, CalendarDays } from "lucide-react";

interface Booking {
  id: number;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function BookingPage() {
  const [items, setItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch("/api/bookings")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => toast.error("Yuklashda xatolik"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("O'chirishda xatolik"); return; }
    toast.success("O'chirildi");
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl md:text-2xl font-body font-bold">Aloqa</h1>
        <p className="text-sm md:text-base text-foreground/70 mt-1">Mijozlardan kelgan murojaatlar</p>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Yuklanmoqda...</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <Send className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground">Hali murojaatlar mavjud emas</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-border p-4 md:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${item.phone}`} className="hover:text-primary">{item.phone}</a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {new Date(item.createdAt).toLocaleString("uz-UZ")}
                    </div>
                  </div>
                  {item.message && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                      <p>{item.message}</p>
                    </div>
                  )}
                </div>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-xl hover:bg-red-50 text-muted-foreground hover:text-red-500 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
