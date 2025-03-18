import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DataNavigation from "./DataNavigation";

describe("DataNavigation Component", () => {
  const mockSetDataFocus = jest.fn();

  const defaultProps = {
    dataId: 1,
    setDataFocus: mockSetDataFocus,
    previousText: "Previous",
    previousCondition: false,
    nextText: "Next",
    nextCondition: false,
    dataDescription: "Data Navigation",
  };

  beforeEach(() => {
    mockSetDataFocus.mockClear();
  });

  it("renders the previous button with correct label", () => {
    const { getByTestId } = render(<DataNavigation {...defaultProps} />);
    expect(getByTestId("previous-data")).toHaveTextContent("Previous");
  });

  it("renders the next button with correct label", () => {
    const { getByTestId } = render(<DataNavigation {...defaultProps} />);
    expect(getByTestId("next-data")).toHaveTextContent("Next");
  });

  it("renders the data description correctly", () => {
    const { getByText } = render(<DataNavigation {...defaultProps} />);
    expect(getByText("Data Navigation")).toBeInTheDocument();
  });

  it("disables previous button when previousCondition is true", () => {
    const { getByTestId } = render(
      <DataNavigation {...defaultProps} previousCondition={true} />,
    );
    expect(getByTestId("previous-data")).toBeDisabled();
  });

  it("disables next button when nextCondition is true", () => {
    const { getByTestId } = render(
      <DataNavigation {...defaultProps} nextCondition={true} />,
    );
    expect(getByTestId("next-data")).toBeDisabled();
  });

  it("triggers setDataFocus with correct id when previous button is clicked", () => {
    const { getByTestId } = render(<DataNavigation {...defaultProps} />);
    fireEvent.click(getByTestId("previous-data"));
    expect(mockSetDataFocus).toHaveBeenCalledWith(0); // dataId - 1
  });

  it("triggers setDataFocus with correct id when next button is clicked", () => {
    const { getByTestId } = render(<DataNavigation {...defaultProps} />);
    fireEvent.click(getByTestId("next-data"));
    expect(mockSetDataFocus).toHaveBeenCalledWith(2); // dataId + 1
  });
});
