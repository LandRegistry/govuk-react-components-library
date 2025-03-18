import { createAll, SkipLink } from "govuk-frontend";

export function ConfigureOverallSkipLink($scope?: Document | Element) {
  createAll(SkipLink, undefined, $scope);
}
