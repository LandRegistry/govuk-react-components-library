export interface PDFViewerCanvasProps {
  src: string;
  className?: string;
  documentName?: string;
  pageNumber?: number;
  showNavigation?: boolean;
  [key: string]: unknown;
}
