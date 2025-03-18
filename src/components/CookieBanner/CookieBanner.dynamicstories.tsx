import fixtures from "govuk-frontend/dist/govuk/components/cookie-banner/fixtures.json";
import {
  createBaseCSF,
  storiesFromFixtures,
  storiesFromFixturesSCF,
} from "../../utils/StoriesFromFixtures";
import { defineStories } from "../../dynamics";

export function stories() {
  const storiesFixture = storiesFromFixtures(fixtures);
  return storiesFixture;
}

export default defineStories({
  baseCsf: createBaseCSF(fixtures.component, false),
  storiesCsf: storiesFromFixturesSCF(fixtures),
});
