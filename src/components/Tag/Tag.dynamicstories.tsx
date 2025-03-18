import fixtures from "govuk-frontend/dist/govuk/components/tag/fixtures.json";

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
  baseCsf: createBaseCSF(fixtures.component),
  storiesCsf: storiesFromFixturesSCF(fixtures),
});
