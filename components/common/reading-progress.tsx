"use client";

import { useCallback, useEffect, useState } from "react";

interface ReadingProgressProps {
  /** Thresholds at which to fire GA4 scroll events (as percentages 0-100) */
  thresholds?: number[];
}

/**
 * Reading progress bar that fires GA4 scroll events at configured thresholds.
 * Only visible when the user has scrolled past the top of the article content.
 */
export function ReadingProgress({
  thresholds = [25, 50, 75, 90],
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [firedThresholds, setFiredThresholds] = useState<Set<number>>(
    new Set()
  );

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - windowHeight;

    if (docHeight > 0) {
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      setProgress(scrollPercent);

      // Fire GA4 events at each threshold (only once)
      for (let i = 0; i < thresholds.length; i++) {
        const threshold = thresholds[i];
        if (scrollPercent >= threshold && !firedThresholds.has(threshold)) {
          if ((window as any).gtag) {
            (window as any).gtag("event", "scroll", {
              scroll_depth: threshold,
            });
          }
          const newSet = new Set(firedThresholds);
          newSet.add(threshold);
          setFiredThresholds(newSet);
        }
      }
    }
  }, [thresholds, firedThresholds]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-primary transition-all duration-100"
      style={{ width: `${progress}%` }}
    />
  );
}
