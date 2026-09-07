import { useState, type FormEvent } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, Phone, Sparkles } from "lucide-react";

const BookingSection = () => {
  const ref = useScrollAnimation<HTMLElement>();
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const formatPhoneNumber = (value: string) => {
    let numbers = value.replace(/\D/g, "");
    
    // If empty or just starting, show nothing or just the prefix
    if (numbers.length === 0) return "";
    
    // Handle cases where the user starts typing or pastes a number
    // We want to ensure it has the 998 prefix if it's an Uzbek number
    if (numbers.length > 0 && !numbers.startsWith("998")) {
      // If they type something like "90", make it "99890"
      if (numbers.length <= 9) {
        numbers = "998" + numbers;
      }
    }
    
    // Limit to 12 digits (998 + 9 digits)
    numbers = numbers.slice(0, 12);
    
    let result = "+998 ";
    const part1 = numbers.slice(3, 5);
    const part2 = numbers.slice(5, 8);
    const part3 = numbers.slice(8, 10);
    const part4 = numbers.slice(10, 12);

    if (part1) result += part1;
    if (part2) result += " " + part2;
    if (part3) result += " " + part3;
    if (part4) result += " " + part4;

    return result;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (phone.replace(/\D/g, "").length < 12) {
      setError(t("lang") === "ru" ? "Пожалуйста, введите номер телефона полностью!" : "Iltimos, telefon raqamingizni to'liq kiriting!");
      return;
    }

    setLoading(true);
    setError(null);

    const botToken = "8699297594:AAGkFUr0oDU3dmCE4HrNpumaAJ7yX1_5s5g";
    const chatIds = ["5040063354", "7626052516"];
    
    // Restore the beautiful formatting with emojis and dividers
    const now = new Date();
    const formattedTime = now.toLocaleString("uz-UZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).replace(/\//g, ".");

    const text = `
✨ Yangi so'rovnoma keldi!
━━━━━━━━━━━━━━━━━━━━
👤 Ism: ${name}
📞 Telefon: ${phone}
✉️ Xabar: ${message}
━━━━━━━━━━━━━━━━━━━━
⏰ Vaqt: ${formattedTime}
    `.trim();

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      const results = await Promise.all(
        chatIds.map(async (chatId) => {
          try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                chat_id: chatId,
                text: text,
              }),
            });
            const data = await response.json();
            if (!response.ok) {
              console.error(`Telegram Error for ${chatId}:`, data);
            }
            return { chatId, ok: response.ok, data };
          } catch (err) {
            console.error(`Fetch Error for ${chatId}:`, err);
            return { chatId, ok: false, error: err };
          }
        })
      );

      const anySuccess = results.some(res => res.ok);

      if (anySuccess) {
        setSubmitted(true);
        setName("");
        setPhone("");
        setMessage("");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(t("lang") === "ru" 
          ? "Ошибка при отправке. Попробуйте еще раз." 
          : "Xabar yuborishda xatolik. Iltimos, qaytadan urinib ko'ring.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(t("lang") === "ru" 
        ? "Проблема с сетью. Проверьте интернет." 
        : "Tarmoq xatosi. Internetni tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" ref={ref} className="py-24 md:py-32 gradient-warm">
      <div className="container px-6">
        <div className="text-center mb-16 animate-in-view">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">{t("booking.label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">{t("booking.title")}</h2>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className="animate-in-view glass-strong rounded-3xl p-8 md:p-12 max-w-xl mx-auto space-y-6 relative z-10"
        >
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input 
              type="text" 
              placeholder={t("booking.name")} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" 
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input 
              type="tel" 
              value={phone}
              onChange={handlePhoneChange}
              placeholder={t("booking.phone")} 
              required 
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" 
            />
          </div>
          <div className="relative">
            <Sparkles className="absolute left-4 top-4 text-primary" size={18} />
            <textarea 
              placeholder={t("booking.message")} 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required 
              rows={4}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
            ></textarea>
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-center animate-fade-in">
              {t("booking.sent")}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center animate-fade-in">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || submitted}
            className={`w-full gradient-primary text-primary-foreground font-semibold py-4 rounded-xl hover-glow transition-all duration-300 md:hover:scale-[1.02] active:scale-[0.98] ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (t("lang") === "ru" ? "Отправка..." : "Yuborilmoqda...") : (submitted ? t("booking.sent") : t("booking.submit"))}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;
