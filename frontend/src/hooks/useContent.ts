import { useState, useEffect } from "react";

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  buttonText: string;
}

export function useContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => {
        if (!res.ok) throw new Error("Kontent yuklanmadi");
        return res.json();
      })
      .then((data: SiteContent) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { content, loading, error };
}
