import { createAll, Header } from "govuk-frontend";

export function ConfigureOverallHeader($scope?: Document | Element) {
  createAll(Header, undefined, $scope);
}
