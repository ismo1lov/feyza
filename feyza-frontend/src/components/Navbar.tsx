import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";


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
  const { lang, setLang, t } = useLanguage();

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
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-colors">
            <img src="/favicon.png" alt="Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <span className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-gradient whitespace-nowrap">
            Feyza Aura
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              {t(link.key)}
            </a>
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
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2"
            >
              {t(link.key)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
