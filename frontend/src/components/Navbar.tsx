import { useState, useEffect, useCallback } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import { usePolling } from "@/hooks/usePolling";


const navLinks = [
  { key: "nav.home", href: "#hero" },
  { key: "nav.services", href: "#services" },
  { key: "nav.gallery", href: "#gallery" },
  { key: "nav.faq", href: "#faq" },
  { key: "nav.contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [siteName, setSiteName] = useState("Feyza Aura");
  const { lang, setLang, t } = useLanguage();

  const scrollTo = useCallback((href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  usePolling(async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.site_name) setSiteName(data.site_name);
    } catch {}
  }, 5000);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === "uz" ? "ru" : "uz");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2 group bg-transparent border-none cursor-pointer p-0"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-colors">
            <img src="/favicon.png" alt="Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <span className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-gradient whitespace-nowrap">
            {siteName}
          </span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300 bg-transparent border-none cursor-pointer p-0"
            >
              {t(link.key)}
            </button>
          ))}

          {/* Language switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full glass border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
          >
            <Globe size={14} className="text-primary" />
            <span className="text-foreground">{lang === "uz" ? "UZ" : "RU"}</span>
          </button>
        </div>

        {/* Mobile right section */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full glass border border-primary/20"
          >
            <Globe size={12} className="text-primary" />
            {lang === "uz" ? "UZ" : "RU"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-strong transition-all duration-400 overflow-hidden ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => { scrollTo(link.href); setIsOpen(false); }}
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 bg-transparent border-none cursor-pointer text-left p-0"
            >
              {t(link.key)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
