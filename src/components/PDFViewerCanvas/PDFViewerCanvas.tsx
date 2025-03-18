import React, { useEffect, useState, useRef, useCallback } from "react";
import { Loading } from "../Loading";
import { Slugify } from "../PDFViewer/Slugify";
import { PDFViewerCanvasProps } from "./PDFViewerCanvas.types";
import * as pdfjsLib from "../../pdfjs";
import { ResolvePDFSource } from "../PDFViewer/ResolvePDFSource";
import { DifferenceNavigation } from "../DifferenceNavigation";
import { ErrorMessage } from "../ErrorMessage";

/**
 * PDFViewerCanvas component for rendering PDF documents on a canvas.
 * @param {PDFViewerCanvasProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const PDFViewerCanvas: React.FC<PDFViewerCanvasProps> = ({
  src,
  className,
  documentName,
  pageNumber = 1,
  showNavigation = true,
  ...attributes
}) => {
  const [pdfState, setPdfState] = useState({
    loading: true,
    numberOfPages: 0,
    currentPage: pageNumber,
    errorMessage: "",
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pdfDocumentRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);
  const pageRenderingRef = useRef<boolean>(false);
  const pageNumberPendingRef = useRef<number | null>(null);
  const scale = 1;

  const renderPage = useCallback(
    (pageNum: number) => {
      const pdfDocument = pdfDocumentRef.current;
      const canvas = canvasRef.current;
      if (!pdfDocument || !canvas) return;

      pageRenderingRef.current = true;

      pdfDocument.getPage(pageNum).then((page: pdfjsLib.PDFPageProxy) => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const context = canvas.getContext("2d");
        if (context) {
          const renderContext = {
            canvasContext: context,
            viewport,
            annotationMode: 3,
          };
          const renderTask = page.render(renderContext);
          renderTask.promise.then(() => {
            pageRenderingRef.current = false;
            if (pageNumberPendingRef.current !== null) {
              renderPage(pageNumberPendingRef.current);
              pageNumberPendingRef.current = null;
            }
          });
        }
      });
    },
    [scale],
  );

  const queueRenderPage = useCallback(
    (pageNum: number) => {
      if (pageRenderingRef.current) {
        pageNumberPendingRef.current = pageNum;
      } else {
        renderPage(pageNum);
      }
    },
    [renderPage],
  );

  const setDifferenceFocus = useCallback(
    (pageNum: number) => {
      if (pageNum < 1 || pageNum > pdfState.numberOfPages) return;
      setPdfState((prevState) => ({
        ...prevState,
        currentPage: pageNum,
      }));
      queueRenderPage(pageNum);
    },
    [pdfState.numberOfPages, queueRenderPage],
  );

  useEffect(() => {
    const loadPDF = async (file: string) => {
      try {
        setPdfState((prevState) => ({ ...prevState, loading: true }));
        const source = ResolvePDFSource(file).source;
        const pdf = await pdfjsLib.getDocument(source).promise;
        pdfDocumentRef.current = pdf;

        const initialPageNumber = pdf.numPages >= pageNumber ? pageNumber : 1;

        setPdfState({
          loading: false,
          numberOfPages: pdf.numPages,
          currentPage: initialPageNumber,
          errorMessage: "",
        });

        renderPage(initialPageNumber);
      } catch (error) {
        console.error("Error loading PDF:", error);
        setPdfState((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: documentName
            ? `There was an error loading the PDF document called "${documentName}".`
            : "There was an error loading the PDF document.",
        }));
      }
    };

    if (src) {
      loadPDF(src);
    }
  }, [src, pageNumber, renderPage]);

  return (
    <>
      {pdfState.loading && <Loading message="Loading PDF Document on Canvas" />}
      {pdfState.errorMessage && (
        <ErrorMessage className="govuk-!-text-align-centre">
          {pdfState.errorMessage}
        </ErrorMessage>
      )}
      {showNavigation && pdfState.numberOfPages > 1 && (
        <div style={{ margin: "0 auto" }}>
          <DifferenceNavigation
            differenceId={pdfState.currentPage}
            setDifferenceFocus={setDifferenceFocus}
            totalDifferences={pdfState.numberOfPages}
            keyword="page"
            plural="Pages"
          />
        </div>
      )}
      <canvas
        className={className}
        ref={canvasRef}
        id={`viewer-${Slugify(documentName || "")}`}
        data-testid="viewer"
        style={{ width: "100%", height: "100%" }}
        {...attributes}
      />
    </>
  );
};

export default PDFViewerCanvas;
