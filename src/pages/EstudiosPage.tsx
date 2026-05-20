import { useXsltTransform } from "../hooks";

export default function EstudiosPage() {
  const { containerRef } = useXsltTransform(
    "/studios/studios.xml",
    "/studios/studios.xsl",
  );

  return <div ref={containerRef}></div>;
}
