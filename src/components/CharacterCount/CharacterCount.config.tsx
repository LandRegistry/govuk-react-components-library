import { CharacterCount, createAll } from "govuk-frontend";
import { CharacterCountConfig } from "govuk-frontend/dist/govuk/components/character-count/character-count";

export function ConfigureOverallCharacterCount(
  $scope?: Document | Element,
  config?: CharacterCountConfig,
) {
  createAll(CharacterCount, config, $scope);
}
