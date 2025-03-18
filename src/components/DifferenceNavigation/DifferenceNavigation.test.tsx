import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DifferenceNavigation from "./DifferenceNavigation";

describe("DifferenceNavigation Component", () => {
  const mockSetDifferenceFocus = jest.fn();

  test("renders the navigation buttons and the correct difference info", () => {
    render(
      <DifferenceNavigation
        differenceId={2}
        setDifferenceFocus={mockSetDifferenceFocus}
        totalDifferences={5}
        keyword="change"
        plural="changes"
      />,
    );

    // Check that the previous and next buttons are rendered
    const previousButton = screen.getByTestId("previous-change");
    const nextButton = screen.getByTestId("next-change");
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Check the difference info
    expect(screen.getByText("Change 2 of 5")).toBeInTheDocument();
  });

  test("disables previous button on the first difference", () => {
    render(
      <DifferenceNavigation
        differenceId={1}
        setDifferenceFocus={mockSetDifferenceFocus}
        totalDifferences={5}
      />,
    );

    const previousButton = screen.getByTestId("previous-variation");
    expect(previousButton).toBeDisabled();
  });

  test("disables next button on the last difference", () => {
    render(
      <DifferenceNavigation
        differenceId={5}
        setDifferenceFocus={mockSetDifferenceFocus}
        totalDifferences={5}
      />,
    );

    const nextButton = screen.getByTestId("next-variation");
    expect(nextButton).toBeDisabled();
  });

  test("calls setDifferenceFocus with the correct value on button click", () => {
    render(
      <DifferenceNavigation
        differenceId={3}
        setDifferenceFocus={mockSetDifferenceFocus}
        totalDifferences={5}
      />,
    );

    const previousButton = screen.getByTestId("previous-variation");
    const nextButton = screen.getByTestId("next-variation");

    fireEvent.click(previousButton);
    expect(mockSetDifferenceFocus).toHaveBeenCalledWith(2);

    fireEvent.click(nextButton);
    expect(mockSetDifferenceFocus).toHaveBeenCalledWith(4);
  });

  test("shows 'No variations found' when totalDifferences is 0", () => {
    render(
      <DifferenceNavigation
        differenceId={0}
        setDifferenceFocus={mockSetDifferenceFocus}
        totalDifferences={0}
      />,
    );

    expect(screen.getByText("No variations found")).toBeInTheDocument();
  });
});
