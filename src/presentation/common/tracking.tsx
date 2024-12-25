"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export interface UseTrackingProps {
  trackingId: string;
}

export const useTracking = ({ trackingId }: UseTrackingProps): void => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = window.gtag as (
        command: string,
        id: string,
        params?: Record<string, unknown>
      ) => void;

      if (typeof gtag === "function") {
        gtag("config", trackingId, {
          page_path: pathname
        });
      }
    }
  }, [pathname, trackingId]);
};
