// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import PDFViewer from "./PDFViewer";
import { Meta, StoryObj } from "@storybook/react-vite";
import {
  document as Base64Document,
  sampleOfficialNumber,
} from "./testutilities/SampleBase64";
import { PDFViewerBackend } from "./PDFViewerBackend";

const meta: Meta<typeof PDFViewer> = {
  title: "ReactComponentLibrary/PDF viewer",
  component: PDFViewer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PDFViewer>;

export const DefaultExample: Story = {
  args: {
    viewerLocation: "/pdfjs-4.4.168-dist/web/viewer.html",
    iframeId: "document_iframe",
    backend: PDFViewerBackend,
    src: "/test.pdf",
    documentName: `AC1 ${sampleOfficialNumber}`,
    style: {
      width: "100%",
      height: "100vh",
    },
  },
};

export const MinimalToolbarHidePrintButton: Story = {
  args: {
    ...DefaultExample.args,
    documentName: `LCOP ${sampleOfficialNumber}`,
    toolbar: "minimalHidePrint",
  },
};

export const ShowFullToolbar: Story = {
  args: {
    ...MinimalToolbarHidePrintButton.args,
    toolbar: "full",
  },
};

export const FullToolbarWithNoDocumentNameAndAdditionalBackendAttributes: Story =
  {
    args: {
      ...ShowFullToolbar.args,
      documentName: undefined,
      additionalBackendAttributes: { documentType: "precedent" },
    },
  };

export const FullToolbarAndHidePrint: Story = {
  args: {
    ...MinimalToolbarHidePrintButton.args,
    toolbar: "fullHidePrint",
  },
};

export const FullToolbarAndDocumentNameDifferentColour: Story = {
  args: {
    ...MinimalToolbarHidePrintButton.args,
    toolbar: "fullHidePrint",
    documentNameColour: "Orange",
  },
};

export const sourceFromBase64EncodedPDFData: Story = {
  args: {
    ...ShowFullToolbar.args,
    src: Base64Document,
  },
};
