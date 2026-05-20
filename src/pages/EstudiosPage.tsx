import { useId } from "react";
import { useXsltTransform } from "../hooks";

export default function EstudiosPage() {
  const headingId = useId();
  const { containerRef } = useXsltTransform(
    "/studios/studios.xml",
    "/studios/studios.xsl",
  );

  return (
    <section ref={containerRef}>
      <title>Estudios · AniKisetsu</title>

      <h1 id={headingId} className="sr-only">
        Estudios
      </h1>
    </section>
  );
}
