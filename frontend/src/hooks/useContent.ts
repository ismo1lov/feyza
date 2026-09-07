import { useState, useEffect } from "react";
import { usePolling } from "@/hooks/usePolling";

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  buttonText: string;
}

export function useContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  usePolling(async () => {
    try {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("Kontent yuklanmadi");
      const data: SiteContent = await res.json();
      setContent(data);
      setLoading(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Xatolik");
      setLoading(false);
    }
  }, 5000);

  return { content, loading, error };
}
