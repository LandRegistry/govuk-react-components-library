import { expect, describe, test, beforeEach, jest } from "@jest/globals";
import {
  ResolvePDFSource,
  isBase64,
  _base64ToArrayBuffer,
} from "./ResolvePDFSource";
import { document as samplePdfBase64 } from "./testutilities/SampleBase64";

describe("ResolvePDFSource", () => {
  beforeEach(() => {
    window.URL.createObjectURL = jest
      .fn()
      .mockReturnValue("blob:mock-object-url");
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns an empty, non-base64 source when given undefined", () => {
    expect(ResolvePDFSource(undefined)).toEqual({
      isBase64Source: false,
      source: "",
    });
  });

  test("returns an empty, non-base64 source when given null", () => {
    expect(ResolvePDFSource(null)).toEqual({
      isBase64Source: false,
      source: "",
    });
  });

  test("returns an empty, non-base64 source when given an empty string", () => {
    expect(ResolvePDFSource("")).toEqual({
      isBase64Source: false,
      source: "",
    });
  });

  test("creates an object URL when given a Blob", () => {
    const blob = new Blob(["test"], { type: "application/pdf" });
    const result = ResolvePDFSource(blob);
    expect(result).toEqual({
      isBase64Source: true,
      source: "blob:mock-object-url",
    });
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
  });

  test("returns an existing blob: URL as-is", () => {
    const blobUrl = "blob:http://localhost/existing-blob-id";
    expect(ResolvePDFSource(blobUrl)).toEqual({
      isBase64Source: false,
      source: blobUrl,
    });
  });

  test("decodes a base64 data: URL into an object URL", () => {
    const dataUrl = `data:application/pdf;base64,${samplePdfBase64}`;
    const result = ResolvePDFSource(dataUrl);
    expect(result).toEqual({
      isBase64Source: true,
      source: "blob:mock-object-url",
    });
  });

  test("returns a non-base64 data: URL as-is", () => {
    const dataUrl = "data:text/plain,hello%20world";
    expect(ResolvePDFSource(dataUrl)).toEqual({
      isBase64Source: false,
      source: dataUrl,
    });
  });

  test("returns a data: URL without a comma as-is (falls through to URL handling)", () => {
    const dataUrl = "data:application/pdf;base64";
    const result = ResolvePDFSource(dataUrl);
    expect(result).toEqual({
      isBase64Source: false,
      source: dataUrl,
    });
  });

  test("falls back to the original data: URL when base64 decoding fails", () => {
    const dataUrl = "data:application/pdf;base64,not-valid-base64-!!!";
    const result = ResolvePDFSource(dataUrl);
    expect(result).toEqual({
      isBase64Source: false,
      source: dataUrl,
    });
    expect(console.error).toHaveBeenCalled();
  });

  test("decodes a plain base64 string into an object URL", () => {
    const result = ResolvePDFSource(samplePdfBase64);
    expect(result).toEqual({
      isBase64Source: true,
      source: "blob:mock-object-url",
    });
  });

  test("returns a regular http(s) URL as-is", () => {
    const url = "https://example.com/document.pdf";
    expect(ResolvePDFSource(url)).toEqual({
      isBase64Source: false,
      source: url,
    });
  });

  test("returns a regular relative path as-is", () => {
    const path = "/documents/document.pdf";
    expect(ResolvePDFSource(path)).toEqual({
      isBase64Source: false,
      source: path,
    });
  });

  test("converts a non-string, non-Blob source to a string as a fallback", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = ResolvePDFSource(12345 as any);
    expect(result).toEqual({
      isBase64Source: false,
      source: "12345",
    });
  });

  test("falls back to an empty source when even String() conversion fails", () => {
    const unstringifiable = {
      toString: () => {
        throw new Error("cannot stringify");
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = ResolvePDFSource(unstringifiable as any);
    expect(result).toEqual({
      isBase64Source: false,
      source: "",
    });
    expect(console.error).toHaveBeenCalled();
  });

  test("falls back to the original plain base64 string when decoding fails", () => {
    const atobSpy = jest.spyOn(window, "atob").mockImplementationOnce(() => {
      throw new Error("invalid character");
    });
    const result = ResolvePDFSource(samplePdfBase64);
    expect(result).toEqual({
      isBase64Source: false,
      source: samplePdfBase64,
    });
    expect(console.error).toHaveBeenCalled();
    atobSpy.mockRestore();
  });
});

describe("isBase64", () => {
  test("returns true for a valid base64 string", () => {
    expect(isBase64("SGVsbG8gV29ybGQ=")).toBe(true);
  });

  test("returns false for a string containing invalid characters", () => {
    expect(isBase64("not base64! (has spaces and symbols)")).toBe(false);
  });
});

describe("_base64ToArrayBuffer", () => {
  test("converts a base64 string into an ArrayBuffer of the expected length", () => {
    const buffer = _base64ToArrayBuffer("SGVsbG8=");
    expect(buffer).toBeInstanceOf(ArrayBuffer);
    expect(new Uint8Array(buffer)).toEqual(
      new Uint8Array([72, 101, 108, 108, 111]),
    );
  });
});
