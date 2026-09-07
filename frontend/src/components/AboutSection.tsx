import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Award, Heart } from "lucide-react";

const ICONS: Record<string, React.ElementType> = { Shield, Award, Heart };

const AboutSection = () => {
  const ref = useScrollAnimation<HTMLElement>();
  const { t } = useLanguage();
  const [about, setAbout] = useState<{
    title: string; description: string;
    value1_title: string; value1_desc: string;
    value2_title: string; value2_desc: string;
    value3_title: string; value3_desc: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.title) setAbout(data)
      })
      .catch(() => {});
  }, []);

  const fallbackAbout = {
    title: t("about.title"),
    description: t("about.desc"),
    value1_title: t("about.hygiene"),
    value1_desc: t("about.hygiene.desc"),
    value2_title: t("about.professional"),
    value2_desc: t("about.professional.desc"),
    value3_title: t("about.comfort"),
    value3_desc: t("about.comfort.desc"),
  };

  const data = about || fallbackAbout;

  const values = [
    { icon: Shield, title: data.value1_title, desc: data.value1_desc },
    { icon: Award, title: data.value2_title, desc: data.value2_desc },
    { icon: Heart, title: data.value3_title, desc: data.value3_desc },
  ];

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 gradient-warm">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-in-view">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">{t("about.label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">{data.title}</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{data.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="animate-in-view glass rounded-2xl p-8 text-center card-3d" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-5">
                <v.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
