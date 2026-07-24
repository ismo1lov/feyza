import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import type { SiteContent } from "@/hooks/useContent";

interface Props {
  content?: SiteContent | null;
}

const HeroSection = ({ content }: Props) => {
  const { t } = useLanguage();

  const heroTitle = content?.heroTitle || `${t("hero.title1")} ${t("hero.title2")}`;
  const heroSubtitle = content?.heroSubtitle || t("hero.desc");
  const buttonText = content?.buttonText || t("hero.cta");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full" 
          style={{ 
            backgroundImage: `url(${heroBg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundAttachment: 'fixed' 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background" />
      </div>

      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/15 blur-[60px] animate-float" />
      <div className="absolute bottom-32 right-16 w-56 h-56 rounded-full bg-accent/20 blur-[80px] animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/10 blur-[40px] animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 container text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            {heroTitle}
          </h1>

          <div
            className="w-16 h-[2px] mx-auto rounded-full gradient-primary mb-6 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          />

          <p
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            {heroSubtitle}
          </p>

          <div className="animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-semibold px-10 py-4 rounded-full hover-glow transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {buttonText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
