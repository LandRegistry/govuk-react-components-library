import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { expect, afterEach, describe, test } from "@jest/globals";

import Landing from "./Landing";

function SignedInPage() {
  return (
    <div>
      <h2>Signed in page</h2>
    </div>
  );
}

function AnotherPage() {
  return (
    <div>
      <h2>Another page</h2>
    </div>
  );
}

function renderWithRouterMatch({ path = "/landing", to = "/" } = {}) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={`/`} element={<SignedInPage />} />
        <Route path={"/landing"} element={<Landing to={to} />} />
        <Route path={"/another"} element={<AnotherPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

afterEach(() => {
  cleanup();
});

describe("The Landing page should", () => {
  test("Redirect to the Signed in page", async () => {
    renderWithRouterMatch();
    const link = screen.getByText("Single sign on", { selector: "a" });
    fireEvent.click(link);
    expect(screen.getByText("Signed in page")).toBeTruthy();
  });

  test("Redirect to the Another page if `to` parameter is point to another page", async () => {
    renderWithRouterMatch({ to: "/another" });
    const link = screen.getByText("Single sign on", { selector: "a" });
    fireEvent.click(link);
    expect(screen.getByText("Another page")).toBeTruthy();
  });
});
