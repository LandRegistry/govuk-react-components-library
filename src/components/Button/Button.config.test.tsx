import { expect, describe, test } from "@jest/globals";
import { ConfigureOverallButton } from "./Button.config";

describe("Button.config", () => {
  test("ConfigureOverallButton runs without a scope or config and does not throw", () => {
    expect(() => ConfigureOverallButton()).not.toThrow();
  });

  test("ConfigureOverallButton initialises matching elements within a given scope", () => {
    document.body.innerHTML = `
      <button class="govuk-button" data-module="govuk-button">Save</button>
    `;
    expect(() =>
      ConfigureOverallButton(document, { preventDoubleClick: true }),
    ).not.toThrow();
  });
});
