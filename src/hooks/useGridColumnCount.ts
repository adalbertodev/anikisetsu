import { useLayoutEffect, useRef, useState } from "react";

export const useGridColumnCount = (
  initialColumns: number,
): [React.RefObject<HTMLDivElement | null>, number] => {
  const [columns, setColumns] = useState(initialColumns);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;

    const compute = () => {
      const tracks = getComputedStyle(element)
        .gridTemplateColumns.split(" ")
        .filter(Boolean).length;

      const isNotMobile = window.matchMedia("(min-width: 600px)").matches;
      setColumns(Math.max(1, !isNotMobile ? tracks * 2 : tracks));
    };

    compute();

    const observer = new ResizeObserver(compute);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, columns];
};
