import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

interface GalleryImage {
  id: number;
  image_url: string;
  alt_text: string;
  sort_order: number;
}

const GallerySection = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [sectionMeta, setSectionMeta] = useState<{ title: string; subtitle: string } | null>(null);
  const ref = useScrollAnimation<HTMLElement>([showAll]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setImages(data) })
      .catch(() => {});
    fetch("/api/section-meta/gallery")
      .then((r) => r.json())
      .then((data) => { if (data.title) setSectionMeta(data) })
      .catch(() => {});
  }, []);

  const displayedImages = showAll ? images : images.slice(0, 4);
  const label = sectionMeta?.subtitle || t("gallery.label");
  const title = sectionMeta?.title || t("gallery.title");

  return (
    <section id="gallery" ref={ref} className="py-24 md:py-32">
      <div className="container px-6 text-center">
        <div className="mb-16 animate-in-view">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">{label}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">{title}</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {displayedImages.map((img, i) => (
            <div key={img.id} className="animate-in-view rounded-2xl overflow-hidden group cursor-pointer" style={{ transitionDelay: `${i * 0.1}s` }}>
              <img src={img.image_url} alt={img.alt_text} loading="lazy" width={640} height={640} className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          ))}
        </div>

        {images.length > 4 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="animate-in-view glass px-8 py-3 rounded-full text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {showAll ? t("gallery.showLess") : t("gallery.loadMore")}
          </button>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
