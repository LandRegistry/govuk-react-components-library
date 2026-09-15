import { expect, describe, test, beforeEach, jest } from "@jest/globals";
import { PDFViewerBackend } from "./PDFViewerBackend";
import { document as samplePdfBase64 } from "./testutilities/SampleBase64";

describe("PDFViewerBackend", () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = window.document.createElement("div");
    window.URL.createObjectURL = jest
      .fn()
      .mockReturnValue("blob:mock-object-url");
    window.URL.revokeObjectURL = jest.fn();
  });

  test("appends an iframe with defaults applied when given a regular URL source", () => {
    PDFViewerBackend({
      iframeId: "my-iframe",
      source: "https://example.com/document.pdf",
      viewerLocation: "/pdfjs-4.4.168-dist/web/viewer.html",
      element,
    });

    const iframe = element.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe?.id).toEqual("my-iframe");
    expect(iframe?.src).toContain("/pdfjs-4.4.168-dist/web/viewer.html");
    expect(iframe?.src).toContain("file=https://example.com/document.pdf");
    expect(iframe?.getAttribute("sandbox")).toEqual(
      "allow-scripts allow-same-origin allow-forms allow-downloads",
    );
    expect(iframe?.getAttribute("allow")).toEqual("cross-origin-isolated");
    expect(iframe?.style.width).toEqual("100%");
    expect(iframe?.style.height).toEqual("94%");
  });

  test("uses provided documentName, documentNameColour and toolbar values", () => {
    PDFViewerBackend({
      iframeId: "my-iframe-2",
      source: "https://example.com/document.pdf",
      viewerLocation: "/custom-viewer.html",
      documentName: "My Document",
      documentNameColour: "red",
      toolbar: "full",
      element,
    });

    const iframe = element.querySelector("iframe");
    expect(iframe?.title).toEqual("My Document ");
    expect(iframe?.src).toContain("document_name=My%20Document");
    expect(iframe?.src).toContain("document_name_colour=red");
    expect(iframe?.src).toContain("toolbar=full");
  });

  test("uses the default viewer location when none is provided", () => {
    PDFViewerBackend({
      iframeId: "my-iframe-default-location",
      source: "https://example.com/document.pdf",
      element,
    });

    const iframe = element.querySelector("iframe");
    expect(iframe?.src).toContain("/pdfjs-4.4.168-dist/web/viewer.html");
  });

  test("revokes the object URL on beforeunload when the source is base64-derived", () => {
    PDFViewerBackend({
      iframeId: "my-iframe-3",
      source: samplePdfBase64,
      viewerLocation: "/pdfjs-4.4.168-dist/web/viewer.html",
      element,
    });

    const iframe = element.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).not.toBeNull();

    const event = new Event("beforeunload") as unknown as BeforeUnloadEvent & {
      preventDefault: jest.Mock;
    };
    event.preventDefault = jest.fn();
    iframe.dispatchEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith(
      "blob:mock-object-url",
    );
  });

  test("does not attach a beforeunload revoke listener for a plain URL source", () => {
    PDFViewerBackend({
      iframeId: "my-iframe-4",
      source: "https://example.com/document.pdf",
      viewerLocation: "/pdfjs-4.4.168-dist/web/viewer.html",
      element,
    });

    const iframe = element.querySelector("iframe") as HTMLIFrameElement;
    const event = new Event("beforeunload") as unknown as BeforeUnloadEvent & {
      preventDefault: jest.Mock;
    };
    event.preventDefault = jest.fn();
    iframe.dispatchEvent(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).not.toHaveBeenCalled();
  });

  test("passes through additional attributes into the query string", () => {
    PDFViewerBackend({
      iframeId: "my-iframe-5",
      source: "https://example.com/document.pdf",
      viewerLocation: "/pdfjs-4.4.168-dist/web/viewer.html",
      element,
      page: 3,
    });

    const iframe = element.querySelector("iframe");
    expect(iframe?.src).toContain("page=3");
  });
});
