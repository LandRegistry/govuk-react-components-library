import { Checkboxes, createAll } from "govuk-frontend";

export function ConfigureOverallCheckboxes($scope?: Document | Element) {
  createAll(Checkboxes, undefined, $scope);
}
