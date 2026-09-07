import { useEffect, type DependencyList } from "react";

export function usePolling(loader: () => void, intervalMs = 5000, deps: DependencyList = []) {
  useEffect(() => {
    loader();
    const id = setInterval(loader, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}