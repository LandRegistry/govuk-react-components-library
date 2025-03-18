import { SourceDeterminer } from "./PDFViewer.types";

export const _base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

export const isBase64 = (value: string): boolean =>
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(
    value,
  );

export const ResolvePDFSource = (source: string): SourceDeterminer => {
  const isBase64Source: boolean = isBase64(source);
  if (!isBase64Source) {
    return { isBase64Source, source };
  }
  const blob: Blob = new Blob([_base64ToArrayBuffer(source)], {
    type: "application/pdf",
  });
  return { isBase64Source, source: URL.createObjectURL(blob) };
};
