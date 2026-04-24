import { useCallback, useEffect, useRef, useState } from "react";

interface UseCarouselOptions {
  slideCount: number;
  intervalMs?: number;
  autoplay?: boolean;
}

export const useCarousel = ({
  slideCount,
  intervalMs = 6000,
  autoplay = true,
}: UseCarouselOptions) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const shouldAutoplay = autoplay && slideCount > 1;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimer();

    if (!shouldAutoplay || isPaused) return;

    timerRef.current = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slideCount);
    }, intervalMs);

    return clearTimer;
  }, [
    clearTimer,
    shouldAutoplay,
    isPaused,
    intervalMs,
    slideCount,
    activeIndex,
  ]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const goPrevious = useCallback(
    () => goTo(activeIndex - 1),
    [goTo, activeIndex],
  );

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return {
    activeIndex,
    goTo,
    goNext,
    goPrevious,
    pause,
    resume,
    isPaused,
  };
};
