import { ObjectToQueryString } from "./ObjectToQueryString";
import { PDFJsProps } from "./PDFViewer.types";
import { ResolvePDFSource } from "./ResolvePDFSource";

export const PDFViewerBackend = ({
  iframeId,
  source,
  viewerLocation = "/pdfjs-4.4.168-dist/web/viewer.html",
  documentName,
  documentNameColour = "black",
  toolbar = "minimal",
  element,
  ...remaining
}: PDFJsProps): void => {
  const sourceDeterminer = ResolvePDFSource(source);
  const iframe: HTMLIFrameElement = document.createElement("iframe");
  const queryString = ObjectToQueryString({
    ...remaining,
    file: sourceDeterminer.source,
    document_name: documentName,
    document_name_colour: documentNameColour,
    toolbar,
  });
  // console.log(queryString);
  iframe.id = `${iframeId}`;
  iframe.title = `${documentName} `;
  iframe.src = `${viewerLocation}${queryString}`;
  iframe.style.width = "100%";
  iframe.style.height = "94%";
  if (sourceDeterminer.isBase64Source) {
    iframe.addEventListener("beforeunload", (event: BeforeUnloadEvent) => {
      event.preventDefault();
      URL.revokeObjectURL(sourceDeterminer.source);
    });
  }

  element.appendChild(iframe);
};
