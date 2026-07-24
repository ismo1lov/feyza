import { useEffect, useRef } from "react";

export function useScrollAnimation<T extends HTMLElement>(dependencies: any[] = []) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // On mobile, just make everything visible immediately without animations
      const children = el.querySelectorAll(".animate-in-view");
      children.forEach((child) => child.classList.add("visible"));
      if (el.classList.contains("animate-in-view")) el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const children = el.querySelectorAll(".animate-in-view");
    children.forEach((child) => observer.observe(child));
    if (el.classList.contains("animate-in-view")) observer.observe(el);

    return () => observer.disconnect();
  }, [dependencies]);

  return ref;
}
