import { useEffect, useRef, useState } from "react";

export type XsltStatus = "idle" | "loading" | "success" | "error";

export interface UseXsltTransformResult<
  T extends HTMLElement = HTMLDivElement,
> {
  containerRef: React.RefObject<T | null>;
  status: XsltStatus;
  error: Error | null;
}

export function useXsltTransform<T extends HTMLElement = HTMLDivElement>(
  xmlPath: string,
  xsltPath: string,
): UseXsltTransformResult<T> {
  const containerRef = useRef<T | null>(null);
  const [status, setStatus] = useState<XsltStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!xmlPath || !xsltPath) return;
    const container = containerRef.current;
    if (!container) return;

    const controller = new AbortController();
    let cancelled = false;

    const fetchXmlDoc = async (path: string): Promise<Document> => {
      const res = await fetch(path, { signal: controller.signal });
      if (!res.ok)
        throw new Error(`No se pudo cargar ${path} (HTTP ${res.status})`);
      const text = await res.text();
      const doc = new DOMParser().parseFromString(text, "application/xml");
      const parseError = doc.querySelector("parsererror");
      if (parseError) {
        throw new Error(
          `XML inválido en ${path}: ${parseError.textContent ?? ""}`,
        );
      }
      return doc;
    };

    setStatus("loading");
    setError(null);

    (async () => {
      try {
        const [xmlDoc, xsltDoc] = await Promise.all([
          fetchXmlDoc(xmlPath),
          fetchXmlDoc(xsltPath),
        ]);
        if (cancelled) return;

        const processor = new XSLTProcessor();
        processor.importStylesheet(xsltDoc);
        const fragment = processor.transformToFragment(xmlDoc, document);

        if (cancelled) return;
        if (!fragment)
          throw new Error("La transformación XSLT no produjo resultado.");

        container.replaceChildren(fragment);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setStatus("error");
      }
    })().catch((error) => console.error(error));

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [xmlPath, xsltPath]);

  return { containerRef, status, error };
}
