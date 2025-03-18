import React, { useEffect, useState } from "react";
import { PDFJsProps, PDFViewerProps } from "./PDFViewer.types";
import { Loading } from "../Loading";
import { Slugify } from "./Slugify";

const PDFViewer: React.FC<PDFViewerProps> = (props) => {
  const viewerRef = React.useRef<HTMLDivElement | null>(null);

  const {
    iframeId,
    src,
    viewerLocation,
    documentName,
    documentNameColour,
    backend,
    toolbar = "minimal",
    additionalBackendAttributes,
    ...attributes
  } = props;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const element = viewerRef.current;
    if (!element) return; // Guard against null

    const jsProps: PDFJsProps = {
      iframeId,
      source: src,
      viewerLocation,
      documentName,
      documentNameColour,
      element,
      toolbar,
      ...additionalBackendAttributes,
    };

    backend(jsProps);
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loading message={"Loading PDF Document"} />}
      <div
        ref={viewerRef}
        id={`viewer ${documentName ? Slugify(documentName) : ""}`}
        data-testid={`viewer ${documentName ? Slugify(documentName) : ""}`}
        style={{ width: "100%", height: "100%" }}
        {...attributes}
      />
    </>
  );
};

export default PDFViewer;
