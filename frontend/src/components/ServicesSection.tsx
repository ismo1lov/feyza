import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Heart, Eye, Scissors } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = { Sparkles, Heart, Eye, Scissors };

const ServicesSection = () => {
  const ref = useScrollAnimation<HTMLElement>();
  const { t } = useLanguage();
  const [services, setServices] = useState<{ title: string; description: string; icon: string }[]>([]);
  const [apiFailed, setApiFailed] = useState(false);
  const [sectionMeta, setSectionMeta] = useState<{ title: string; subtitle: string } | null>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) setServices(data)
        else setApiFailed(true)
      })
      .catch(() => setApiFailed(true));
    fetch("/api/section-meta/services")
      .then((r) => r.json())
      .then((data) => { if (data.title) setSectionMeta(data) })
      .catch(() => {});
  }, []);

  const fallbackServices = [
    { title: t("services.manicure"), description: t("services.manicure.desc"), icon: "Sparkles" },
    { title: t("services.massage"), description: t("services.massage.desc"), icon: "Heart" },
    { title: t("services.laminatsiya"), description: t("services.laminatsiya.desc"), icon: "Eye" },
    { title: t("services.depilation"), description: t("services.depilation.desc"), icon: "Scissors" },
  ];

  const displayServices = apiFailed ? fallbackServices : services;
  const label = sectionMeta?.subtitle || t("services.label");
  const title = sectionMeta?.title || t("services.title");

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 gradient-warm">
      <div className="container px-6">
        <div className="text-center mb-16 animate-in-view">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">{label}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Sparkles;
            return (
              <div key={i} className="animate-in-view glass rounded-2xl p-8 card-3d cursor-pointer group" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-primary-foreground" size={24} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
