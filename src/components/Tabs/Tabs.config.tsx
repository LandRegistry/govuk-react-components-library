import { createAll, Tabs } from "govuk-frontend";

export function ConfigureOverallTabs($scope?: Document | Element) {
  createAll(Tabs, undefined, $scope);
}
