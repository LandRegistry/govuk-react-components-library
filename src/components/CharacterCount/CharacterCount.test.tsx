import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import CharacterCount from "./CharacterCount";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/character-count/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

beforeAll(() => {
  console.groupCollapsed = jest.fn();
  console.info = jest.fn();
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
  console.groupEnd = jest.fn();
});

describe("CharacterCount component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for CharacterCount called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <CharacterCount id={example?.options?.id} {...example.options} />
        </MemoryRouter>,
      );
      const determineLength =
        example?.options?.maxlength || example?.options?.maxwords;
      const determineCharacterOrWords = example?.options?.maxwords
        ? "words"
        : "characters";
      expect(
        screen.getByText(
          `You have ${determineLength} ${determineCharacterOrWords} remaining`,
        ),
      ).toBeTruthy();
      expect(screen.getByText(example?.options?.label?.children)).toBeTruthy();
      if (example?.options?.hint?.children) {
        expect(screen.getByText(example?.options?.hint?.children)).toBeTruthy();
      }
      if (example?.options?.errorMessage?.children) {
        expect(
          screen.getByText(example?.options?.errorMessage?.children),
        ).toBeTruthy();
      }
    });
  });
});
