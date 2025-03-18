export interface PDFJsProps {
  iframeId: string;
  source: string;
  viewerLocation: string;
  documentName?: string;
  documentNameColour?: string;
  element: HTMLElement;
  toolbar?:
    | "full"
    | "fullHidePrint"
    | "minimal"
    | "minimalHidePrint"
    | undefined;
  [key: string]: unknown;
}

export interface PDFViewerProps {
  iframeId: string;
  src: string;
  viewerLocation: string;
  documentName?: string;
  documentNameColour?: string;
  toolbar?:
    | "full"
    | "fullHidePrint"
    | "minimal"
    | "minimalHidePrint"
    | undefined;
  backend: (jsProps: PDFJsProps) => void;
  additionalBackendAttributes?: Record<
    string,
    string | number | boolean | null | undefined
  >;
  [key: string]: unknown;
}
export interface SourceDeterminer {
  isBase64Source: boolean;
  source: string;
}
