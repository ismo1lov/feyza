import { useEffect, useState, useCallback } from "react";
import LocomotiveScroll from "locomotive-scroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import CertificatesSection from "@/components/CertificatesSection";
import ReviewsSection from "@/components/ReviewsSection";
import GallerySection from "@/components/GallerySection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import { useContent } from "@/hooks/useContent";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { content } = useContent();

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  useEffect(() => {
    if (showSplash) return;

    let scroll: LocomotiveScroll | null = null;

    const handleScrollInit = () => {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        if (scroll) {
          scroll.destroy();
          scroll = null;
        }
      } else {
        if (!scroll) {
          scroll = new LocomotiveScroll({
            lenisOptions: {
              lerp: 0.075,
              duration: 1.2,
              smoothWheel: true,
            },
          });
        }
      }
    };

    handleScrollInit();

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleScrollInit, 250);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (scroll) scroll.destroy();
    };
  }, [showSplash]);

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <div className={`min-h-screen transition-opacity duration-700 ${showSplash ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <HeroSection content={content} />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <FAQSection />
        <CertificatesSection />
        <ReviewsSection />
        <BookingSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
