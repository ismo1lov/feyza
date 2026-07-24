import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  const ref = useScrollAnimation<HTMLElement>();
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    fetch("/api/faq")
      .then((r) => r.json())
      .then((data) => {
        setFaqs(data);
        if (data.length > 0) setOpenIndex(0);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="faq" ref={ref} className="py-24 md:py-32 gradient-warm">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-in-view">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">{t("faq.label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">{t("faq.title")}</h2>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="animate-in-view glass rounded-2xl overflow-hidden border border-primary/10"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-primary/5 transition-colors"
              >
                <span className="font-heading font-semibold text-foreground">{faq.question}</span>
                <ChevronDown
                  className={`text-primary transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="p-6 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-primary/5">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
