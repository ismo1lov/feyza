import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, MapPin, Instagram, Send, X, Clock } from "lucide-react";

const ContactSection = () => {
  const ref = useScrollAnimation<HTMLElement>();
  const { t } = useLanguage();
  const [showMap, setShowMap] = useState(false);
  const [contact, setContact] = useState<{
    phone: string; telegram: string; telegram_link: string;
    instagram: string; instagram_link: string; location: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then(setContact)
      .catch(() => {});
  }, []);

  return (
    <>
      <section id="contact" ref={ref} className="py-24 md:py-32 gradient-warm">
        <div className="container px-6">
          <div className="text-center mb-16 animate-in-view">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">{t("contact.label")}</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">{t("contact.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <a href={`tel:${contact?.phone?.replace(/\s/g, "") || "+998997232132"}`} className="animate-in-view glass rounded-2xl p-8 text-center card-3d group">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="text-primary" size={22} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{t("contact.phone")}</h3>
              <p className="text-muted-foreground text-sm">{contact?.phone || "+998 99 723 21 32"}</p>
            </a>
            <button
              onClick={() => setShowMap(true)}
              className="animate-in-view glass rounded-2xl p-8 text-center card-3d group cursor-pointer"
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="text-primary" size={22} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{t("contact.location")}</h3>
              <p className="text-muted-foreground text-sm">{contact?.location || t("contact.locationValue")}</p>
            </button>
            <a href={contact?.telegram_link || "https://t.me/Feyza_aura"} target="_blank" rel="noopener noreferrer" className="animate-in-view glass rounded-2xl p-8 text-center card-3d group" style={{ transitionDelay: "0.15s" }}>
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Send className="text-primary" size={22} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">Telegram</h3>
              <p className="text-muted-foreground text-sm">{contact?.telegram || "@Feyza_aura"}</p>
            </a>
            <a href={contact?.instagram_link || "https://www.instagram.com/feyza_aura/"} target="_blank" rel="noopener noreferrer" className="animate-in-view glass rounded-2xl p-8 text-center card-3d group" style={{ transitionDelay: "0.2s" }}>
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Instagram className="text-primary" size={22} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">Instagram</h3>
              <p className="text-muted-foreground text-sm">{contact?.instagram || "@feyza_aura"}</p>
            </a>
          </div>
        </div>
      </section>

      {/* Map Modal */}
      {showMap && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm animate-fade-up"
          onClick={() => setShowMap(false)}
        >
          <div
            className="relative w-full max-w-3xl glass-strong rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h3 className="font-heading font-semibold text-foreground">{t("contact.location")}</h3>
              <button
                onClick={() => setShowMap(false)}
                className="p-1.5 rounded-full hover:bg-accent transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            <div className="p-16 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-soft">
                <Clock size={40} className="text-primary" />
              </div>
              <div>
                <h4 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {t("contact.inProgress")}
                </h4>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  Tez orada xarita va aniq manzil ma'lumotlari qo'shiladi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSection;
