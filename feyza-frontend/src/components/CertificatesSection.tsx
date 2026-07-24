import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface Certificate {
  id: number;
  image_url: string;
  title: string;
  sort_order: number;
}

const CertificatesSection = () => {
  const ref = useScrollAnimation<HTMLElement>();
  const { t } = useLanguage();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  useEffect(() => {
    fetch("/api/certificates")
      .then((r) => r.json())
      .then(setCertificates)
      .catch(() => {});
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "center",
    skipSnaps: false,
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="certificates" ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-secondary/10">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-50">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] rotate-12 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-in-view">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3 font-semibold">{t("certificates.label")}</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient">{t("certificates.title")}</span>
          </h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full" />
        </div>

        <div className="relative group">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing px-4" ref={emblaRef}>
            <div className="flex -ml-6">
              {certificates.map((cert, index) => (
                <div 
                  key={cert.id} 
                  className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%] min-w-0 pl-6"
                >
                  <div 
                    className="animate-in-view group/item relative overflow-hidden rounded-3xl glass-strong border border-primary/20 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(var(--primary),0.2)] h-full"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-[3/4.2] w-full overflow-hidden bg-muted">
                      <img
                        src={cert.image_url}
                        alt={`Sertifikat ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover/item:scale-110"
                      />
                    </div>
                    
                    {/* Overlay with glass effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                      <button 
                        onClick={() => setSelectedImage(cert.image_url)}
                        className="w-full py-3 glass text-white rounded-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500"
                      >
                        <ZoomIn size={18} />
                        <span className="font-semibold uppercase tracking-wider text-[10px]">Kattalashtirish</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {certificates.length > 0 && (
            <div className="flex justify-center gap-4 mt-12 animate-in-view">
              <button 
                onClick={scrollPrev}
                className="w-14 h-14 rounded-full glass border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                onClick={scrollNext}
                className="w-14 h-14 rounded-full glass border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Sertifikat Kattalashtirilgan" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-scale-up"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;
