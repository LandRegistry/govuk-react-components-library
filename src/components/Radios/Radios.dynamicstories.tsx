import {
  createBaseCSF,
  loadFixturesAsJson,
  storiesFromFixtures,
  storiesFromFixturesSCF,
} from "../../utils/StoriesFromFixtures";
import { defineStories } from "../../dynamics";
import fixtures from "govuk-frontend/dist/govuk/components/radios/fixtures.json";

export async function getStories(): Promise<unknown> {
  const fixtureFile: string =
    "./node_modules/govuk-frontend/dist/govuk/components/radios/fixtures.json";
  try {
    const radioFixtures = await loadFixturesAsJson(fixtureFile);
    const storiesFixture = storiesFromFixtures(radioFixtures);
    console.log(`\n${JSON.stringify(storiesFixture)}\n`);
    return storiesFixture;
  } catch (error: unknown) {
    console.warn({ fixtureFile: fixtureFile, error });
  }
}

export default defineStories({
  baseCsf: createBaseCSF(fixtures.component, true),
  storiesCsf: storiesFromFixturesSCF(fixtures, true),
});
