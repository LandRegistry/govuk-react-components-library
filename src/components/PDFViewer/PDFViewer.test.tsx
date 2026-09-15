import React from "react";
import { cleanup, render, screen, act } from "@testing-library/react";
import {
  document as samplePdfBase64,
  sampleOfficialNumber,
} from "./testutilities/SampleBase64";
import PDFViewer from "./PDFViewer";
import { PDFViewerBackend } from "./PDFViewerBackend";
import { MemoryRouter } from "react-router";
import * as ResolvePDFSourceModule from "./ResolvePDFSource";

const iframeId: string = "document_iframe";

const flush = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 0));

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (global as any).fetch;
});

beforeEach(() => {
  window.URL.createObjectURL = jest
    .fn()
    .mockReturnValue("blob:mock-object-url");
  window.URL.revokeObjectURL = jest.fn();
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("PDFViewer can", () => {
  test("create a component containing an iframe", () => {
    const documentType = "AC1";
    const documentName = `${documentType} ${sampleOfficialNumber}`;
    render(
      <MemoryRouter>
        <PDFViewer
          viewerLocation="../../../public/pdfjs-4.4.168-dist/web/viewer.html"
          iframeId={iframeId}
          data-testid={iframeId}
          backend={PDFViewerBackend}
          src={samplePdfBase64}
          documentName={documentName}
        />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(iframeId)).toBeTruthy();
    expect(screen.getByTitle(documentName)).toBeInTheDocument();
  });

  test("render without a documentName", async () => {
    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src={samplePdfBase64}
        />,
      );
      await flush();
    });
    expect(screen.getByTestId(/^viewer/)).toBeInTheDocument();
  });

  test("resolve a base64 source and pass the created object URL to the backend", async () => {
    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src={samplePdfBase64}
          documentName="Base64 doc"
        />,
      );
      await flush();
    });

    expect(backend).toHaveBeenCalledTimes(1);
    const jsProps = backend.mock.calls[0][0];
    expect(jsProps.source).toEqual("blob:mock-object-url");
    // A base64 source should not trigger a network fetch.
    expect((global as unknown as { fetch?: unknown }).fetch).toBeUndefined();
  });

  test("fetch a remote http(s) source and pass the fetched object URL to the backend", async () => {
    const blob = new Blob(["pdf-bytes"], { type: "application/pdf" });
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      blob: () => Promise.resolve(blob),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchMock;

    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="https://example.com/remote.pdf"
          documentName="Remote doc"
        />,
      );
      await flush();
      await flush();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/remote.pdf",
      expect.objectContaining({ credentials: "omit" }),
    );
    expect(backend).toHaveBeenCalledTimes(1);
    const jsProps = backend.mock.calls[0][0];
    expect(jsProps.source).toEqual("blob:mock-object-url");
  });

  test("falls back to the original src when the fetched blob is empty", async () => {
    const emptyBlob = new Blob([], { type: "application/pdf" });
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      blob: () => Promise.resolve(emptyBlob),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchMock;

    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="https://example.com/remote.pdf"
        />,
      );
      await flush();
      await flush();
    });

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("fetched blob is empty"),
    );
    expect(backend).toHaveBeenCalledTimes(1);
    const jsProps = backend.mock.calls[0][0];
    expect(jsProps.source).toEqual("https://example.com/remote.pdf");
  });

  test("falls back to the original src when the fetch response is not ok", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
      blob: () => Promise.resolve(new Blob([])),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchMock;

    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="https://example.com/missing.pdf"
        />,
      );
      await flush();
      await flush();
    });

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("fetch returned 404"),
    );
    expect(backend).toHaveBeenCalledTimes(1);
    const jsProps = backend.mock.calls[0][0];
    expect(jsProps.source).toEqual("https://example.com/missing.pdf");
  });

  test("silently falls back when the fetch is aborted", async () => {
    const abortError = new DOMException("aborted", "AbortError");
    const fetchMock = jest.fn().mockRejectedValue(abortError);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchMock;

    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="https://example.com/remote.pdf"
        />,
      );
      await flush();
      await flush();
    });

    expect(console.error).not.toHaveBeenCalledWith(
      expect.stringContaining("error fetching cross-origin PDF"),
      abortError,
    );
    expect(backend).toHaveBeenCalledTimes(1);
  });

  test("logs and falls back when the fetch throws a non-abort error", async () => {
    const networkError = new Error("network down");
    const fetchMock = jest.fn().mockRejectedValue(networkError);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchMock;

    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="https://example.com/remote.pdf"
        />,
      );
      await flush();
      await flush();
    });

    expect(console.error).toHaveBeenCalledWith(
      "PDFViewer: error fetching cross-origin PDF:",
      networkError,
    );
    expect(backend).toHaveBeenCalledTimes(1);
    const jsProps = backend.mock.calls[0][0];
    expect(jsProps.source).toEqual("https://example.com/remote.pdf");
  });

  test("skips the client-side fetch when disableClientFetch is set", async () => {
    const fetchMock = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchMock;

    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="https://example.com/remote.pdf"
          disableClientFetch
        />,
      );
      await flush();
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(backend).toHaveBeenCalledTimes(1);
    const jsProps = backend.mock.calls[0][0];
    expect(jsProps.source).toEqual("https://example.com/remote.pdf");
  });

  test("does not fetch a plain relative path", async () => {
    const fetchMock = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchMock;

    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="/local/document.pdf"
        />,
      );
      await flush();
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(backend).toHaveBeenCalledTimes(1);
    const jsProps = backend.mock.calls[0][0];
    expect(jsProps.source).toEqual("/local/document.pdf");
  });

  test("logs and continues when the backend throws", async () => {
    const backend = jest.fn(() => {
      throw new Error("backend blew up");
    });
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="/local/document.pdf"
        />,
      );
      await flush();
    });

    expect(console.error).toHaveBeenCalledWith(
      "PDFViewer: backend threw an error:",
      expect.any(Error),
    );
  });

  test("passes additionalBackendAttributes through to the backend", async () => {
    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="/local/document.pdf"
          additionalBackendAttributes={{ page: 3 }}
        />,
      );
      await flush();
    });

    const jsProps = backend.mock.calls[0][0];
    expect(jsProps.page).toEqual(3);
  });

  test("cleans up the fetch controller and revokes the object URL on unmount", async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    const fetchMock = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchMock;

    const backend = jest.fn();
    let unmount: () => void = () => {};
    await act(async () => {
      const result = render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="https://example.com/remote.pdf"
        />,
      );
      unmount = result.unmount;
      await flush();
    });

    act(() => {
      unmount();
    });

    // resolving the fetch after unmount should not throw or call the backend
    await act(async () => {
      resolveFetch({
        ok: true,
        blob: () => Promise.resolve(new Blob(["x"])),
      });
      await flush();
    });

    expect(backend).not.toHaveBeenCalled();
  });

  test("logs an error if aborting the fetch controller throws during cleanup", async () => {
    const abortSpy = jest
      .spyOn(AbortController.prototype, "abort")
      .mockImplementation(() => {
        throw new Error("abort failed");
      });
    let resolveFetch: (value: unknown) => void = () => {};
    const fetchMock = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchMock;

    const backend = jest.fn();
    let unmount: () => void = () => {};
    await act(async () => {
      const result = render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="https://example.com/remote.pdf"
        />,
      );
      unmount = result.unmount;
      await flush();
    });

    act(() => {
      unmount();
    });

    expect(console.error).toHaveBeenCalledWith(
      "PDFViewer: fetch abort error during cleanup:",
      expect.any(Error),
    );

    abortSpy.mockRestore();
    resolveFetch({ ok: true, blob: () => Promise.resolve(new Blob(["x"])) });
  });

  test("logs an error if revoking the object URL throws during cleanup", async () => {
    (window.URL.revokeObjectURL as jest.Mock).mockImplementation(() => {
      throw new Error("revoke failed");
    });

    const backend = jest.fn();
    let unmount: () => void = () => {};
    await act(async () => {
      const result = render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src={samplePdfBase64}
        />,
      );
      unmount = result.unmount;
      await flush();
    });

    act(() => {
      unmount();
    });

    expect(console.error).toHaveBeenCalledWith(
      "PDFViewer: fetch abort error during cleanup:",
      expect.any(Error),
    );
  });

  test("logs and falls back to the original src when ResolvePDFSource throws", async () => {
    const resolveSpy = jest
      .spyOn(ResolvePDFSourceModule, "ResolvePDFSource")
      .mockImplementation(() => {
        throw new Error("resolve blew up");
      });

    const backend = jest.fn();
    await act(async () => {
      render(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="/local/document.pdf"
        />,
      );
      await flush();
    });

    expect(console.error).toHaveBeenCalledWith(
      "PDFViewer: ResolvePDFSource error:",
      expect.any(Error),
    );
    expect(backend).toHaveBeenCalledTimes(1);
    const jsProps = backend.mock.calls[0][0];
    expect(jsProps.source).toEqual("/local/document.pdf");

    resolveSpy.mockRestore();
  });

  test("revokes a previously created object URL when the src changes", async () => {
    const backend = jest.fn();
    const { rerender } = render(
      <PDFViewer
        viewerLocation="viewer.html"
        iframeId={iframeId}
        backend={backend}
        src={samplePdfBase64}
      />,
    );
    await act(async () => {
      await flush();
    });

    await act(async () => {
      rerender(
        <PDFViewer
          viewerLocation="viewer.html"
          iframeId={iframeId}
          backend={backend}
          src="/local/other-document.pdf"
        />,
      );
      await flush();
    });

    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith(
      "blob:mock-object-url",
    );
    expect(backend).toHaveBeenCalledTimes(2);
  });
});
