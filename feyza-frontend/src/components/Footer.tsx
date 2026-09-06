import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const [siteName, setSiteName] = useState("Feyza Aura");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => { if (data.site_name) setSiteName(data.site_name); })
      .catch(() => {});
  }, []);

  return (
    <footer className="py-12 border-t border-border/50 bg-primary/[0.08]">
      <div className="container px-6 text-center flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20 bg-background flex items-center justify-center">
            <img src="/favicon.png" alt="Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <p className="font-heading text-2xl font-bold text-gradient">{siteName}</p>
        </div>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} {siteName}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
