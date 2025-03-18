import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import LinkWithRef from "./LinkWithRef";
import { MemoryRouter } from "react-router";

describe("Link component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic Link properly", () => {
    const linkName = "Some Link";
    render(
      <MemoryRouter>
        <LinkWithRef name="Extra Attribute">{linkName}</LinkWithRef>
      </MemoryRouter>,
    );
    const myLink = screen.getByText(linkName);
    expect(myLink).toBeTruthy();
    expect(myLink.hasAttribute("name")).toBeTruthy();
    expect(myLink.getAttribute("name")).toEqual("Extra Attribute");
    expect(screen.getByRole("link", { name: linkName })).toBeTruthy();
  });

  test("should render react dom Link properly", () => {
    const linkName = "Another Link";
    render(
      <MemoryRouter>
        <LinkWithRef to={{ pathname: "/some-path" }} name="Extra Attribute">
          {linkName}
        </LinkWithRef>
      </MemoryRouter>,
    );
    const myLink = screen.getByText(linkName);
    expect(myLink).toBeTruthy();
    expect(myLink.hasAttribute("name")).toBeTruthy();
    expect(myLink.getAttribute("name")).toEqual("Extra Attribute");
    expect(screen.getByRole("link", { name: linkName })).toBeTruthy();
  });
});
