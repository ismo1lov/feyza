import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, Quote } from "lucide-react";

interface Review { name: string; text: string; rating: number; }

const ReviewsSection = () => {
  const ref = useScrollAnimation<HTMLElement>();
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [apiFailed, setApiFailed] = useState(false);
  const [sectionMeta, setSectionMeta] = useState<{ title: string; subtitle: string } | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) setReviews(data)
        else setApiFailed(true)
      })
      .catch(() => setApiFailed(true));
    fetch("/api/section-meta/reviews")
      .then((r) => r.json())
      .then((data) => { if (data.title) setSectionMeta(data) })
      .catch(() => {});
  }, []);

  const fallbackReviews = [
    { name: t("reviews.r1.name"), text: t("reviews.r1.text"), rating: 5 },
    { name: t("reviews.r2.name"), text: t("reviews.r2.text"), rating: 5 },
    { name: t("reviews.r3.name"), text: t("reviews.r3.text"), rating: 5 },
  ];

  const displayReviews = apiFailed ? fallbackReviews : reviews;

  return (
    <section id="reviews" ref={ref} className="py-24 md:py-32 bg-primary/[0.08]">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-in-view">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">{sectionMeta?.subtitle || t("reviews.label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">{sectionMeta?.title || t("reviews.title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayReviews.map((review, index) => (
            <div
              key={index}
              className="animate-in-view glass rounded-3xl p-8 relative card-3d"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="absolute top-6 right-8 text-primary/10">
                <Quote size={40} />
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground/80 italic mb-6 leading-relaxed">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <span className="font-heading font-semibold text-foreground">
                  {review.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
