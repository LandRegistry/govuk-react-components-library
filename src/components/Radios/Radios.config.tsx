import { createAll, Radios } from "govuk-frontend";

export function ConfigureOverallRadios($scope?: Document | Element) {
  createAll(Radios, undefined, $scope);
}
