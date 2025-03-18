import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { document, sampleOfficialNumber } from "./testutilities/SampleBase64";
import PDFViewer from "./PDFViewer";
import { PDFViewerBackend } from "./PDFViewerBackend";
import { MemoryRouter } from "react-router";

const iframeId: string = "document_iframe";

afterEach(() => {
  cleanup();
});

describe("PDFViewer can", () => {
  beforeEach(() => {});

  test("create a component containing an iframe", () => {
    window.URL.createObjectURL = jest.fn();
    const documentType = "AC1";
    const documentName = `${documentType} ${sampleOfficialNumber}`;
    render(
      <MemoryRouter>
        <PDFViewer
          viewerLocation="../../../public/pdfjs-4.4.168-dist/web/viewer.html"
          iframeId={iframeId}
          data-testid={iframeId}
          backend={PDFViewerBackend}
          src={document}
          documentName={documentName}
        />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(iframeId)).toBeTruthy();
    expect(screen.getByTitle(documentName)).toBeInTheDocument();
  });
});
