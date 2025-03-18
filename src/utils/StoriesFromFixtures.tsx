import type {
  ComponentFixture,
  ComponentFixtureRoot,
  StoryConfigs,
} from "../dynamics";
import { extractShownFixtures } from "./ProcessExampleData";
import { titleCaseNoSpace } from "./TitleCase";
import { dedent } from "ts-dedent";
import fs from "fs/promises";

export async function loadFixturesAsJson(fileLocation: string) {
  const fileData = await fs.readFile(fileLocation, "utf-8");
  return JSON.parse(fileData);
}

export function storiesFromFixtures(
  fixtures: ComponentFixtureRoot,
): StoryConfigs {
  const examplesFromFixtures: Array<ComponentFixture> =
    extractShownFixtures(fixtures);

  const result: StoryConfigs = {} as StoryConfigs;
  Object.values(examplesFromFixtures).map((example: ComponentFixture) => {
    const name: string =
      example.name === "default" ? "default example" : example.name;
    const key: string = `${titleCaseNoSpace(name)}: Story`;
    result[key] = { name: example.name, args: { ...example.options } };
  });
  return result;
}

export function storiesFromFixturesSCF(
  fixtures: ComponentFixtureRoot,
  hasConfig: boolean = false,
): string {
  const examplesFromFixtures: Array<ComponentFixture> =
    extractShownFixtures(fixtures);

  const result: string[] = [];
  const listOfKeys: string[] = [];
  const lengthOfFixture = examplesFromFixtures.length;
  Object.values(examplesFromFixtures).map(
    (example: ComponentFixture, index: number) => {
      const name: string =
        example.name === "default" ? "default example" : example.name;
      const key: string = `${titleCaseNoSpace(name)}`;
      if (listOfKeys.indexOf(key) === -1) {
        listOfKeys.push(key);
        const exportExample: string =
          hasConfig && index === lengthOfFixture - 1
            ? dedent`
    export const ${key} = {
      ...createStory(${index}),
      parameters: { initializeConfigurations: true },
    }`
            : dedent`
        export const ${key} = createStory(${index});
        `;
        result.push(exportExample);
      }
    },
  );
  return result.join("\n");
}

function toTitleCase(text: string): string {
  const formattedText = text
    .toLowerCase()
    .split("-")
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
    )
    .join(" ");
  return formattedText;
}

function toPascalCase(text: string): string {
  return text
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function createBaseCSF(
  fixtureName: string,
  hasConfig: boolean = false,
): string {
  const component = toPascalCase(fixtureName);
  const storyTitleSuffix = toTitleCase(fixtureName);
  return dedent`
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import React ${hasConfig ? `, { useEffect }` : ``}from "react";
  import "./${component}.scss";
  import ${component} from "./${component}";
  import { Meta, StoryObj } from "@storybook/react";
  import fixtures from "govuk-frontend/dist/govuk/components/${fixtureName}/fixtures.json";
  import { extractShownFixtures } from "../../utils/ProcessExampleData";
  import { ComponentFixture } from "../../dynamics";
  ${hasConfig ? `import { ConfigureOverall${component} } from "./${component}.config";\n\nlet configured = false;` : ``}
  const meta: Meta<typeof ${component}> = {
    title: "GOVUK Design System/${storyTitleSuffix.length > 0 ? storyTitleSuffix : component}",
    ${
      hasConfig
        ? `component: ${component},\ndecorators: [
  (Story, { parameters }) => {
    useEffect(() => {
      const configure${component} = () => {
        const isDocsMode = window.location.search.includes("viewMode=docs");
        if (
          isDocsMode &&
          !configured &&
          parameters.initializeConfigurations
        ) {
          ConfigureOverall${component}();
          configured = true;
        } else if (!isDocsMode) {
          ConfigureOverall${component}();
        }
      };
      configure${component}();
    }, []);
    return <Story />;
  },
],`
        : `component: ${component},`
    }
    tags: ["autodocs"],
  };

  export default meta;
  type Story = StoryObj<typeof ${component}>;

  const examplesFromFixtures: Array<ComponentFixture> = extractShownFixtures(fixtures);

  // Utility function to create stories from fixtures
  const createStory = (index: number): Story => {
    const example: ComponentFixture = examplesFromFixtures[index];
    return {
      name: example.name,
      args: { ...example.options },
    };
  };

  // Stories generated from fixtures

`;
}
