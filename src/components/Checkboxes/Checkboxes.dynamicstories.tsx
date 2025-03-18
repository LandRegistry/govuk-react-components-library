import {
  createBaseCSF,
  storiesFromFixtures,
  storiesFromFixturesSCF,
} from "../../utils/StoriesFromFixtures";
import { defineStories } from "../../dynamics";
import fixtures from "govuk-frontend/dist/govuk/components/checkboxes/fixtures.json";

export function stories() {
  const storiesFixture = storiesFromFixtures(fixtures);
  return storiesFixture;
}

export default defineStories({
  baseCsf: createBaseCSF(fixtures.component, true),
  storiesCsf: storiesFromFixturesSCF(fixtures, true),
});
