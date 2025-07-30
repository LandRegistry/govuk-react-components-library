// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./PDFViewerCanvas.scss";
import PDFViewerCanvas from "./PDFViewerCanvas";
import { Meta, StoryObj } from "@storybook/react-vite";
import {
  document as Base64Document,
  sampleOfficialNumber,
} from "../PDFViewer/testutilities/SampleBase64";

const meta: Meta<typeof PDFViewerCanvas> = {
  title: "ReactComponentLibrary/PDF viewer canvas",
  component: PDFViewerCanvas,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PDFViewerCanvas>;

export const DefaultExample: Story = {
  args: {
    documentName: `AC1 ${sampleOfficialNumber}`,
    src: "/document.pdf",
  },
};

export const SourceFromBase64EncodedPDFData: Story = {
  args: {
    ...DefaultExample.args,
    src: Base64Document,
  },
};

export const MultiplePagesPDF: Story = {
  args: {
    documentName: `TP1 ${sampleOfficialNumber}`,
    src: "/test.pdf",
  },
};

export const ErrorLoadingDocument: Story = {
  args: {
    documentName: `TP1 ${sampleOfficialNumber}`,
    src: "/testsomesome.pdf",
  },
};

export const MultiplePagesPDFWithNoNavigation: Story = {
  args: {
    ...MultiplePagesPDF.args,
    showNavigation: false,
  },
};

export const MultiplePagesPDFAndSpecifiedPage: Story = {
  args: {
    ...MultiplePagesPDF.args,
    pageNumber: 2,
  },
};

export const MultiplePagesPDFAndSpecifiedPageWithNoNavigation: Story = {
  args: {
    ...MultiplePagesPDFAndSpecifiedPage.args,
    showNavigation: false,
  },
};

export const MultiplePagesPDFAndLastPage: Story = {
  args: {
    ...MultiplePagesPDF.args,
    pageNumber: 4,
  },
};
