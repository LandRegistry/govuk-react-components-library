import { Button, createAll } from "govuk-frontend";
import { ButtonConfig } from "govuk-frontend/dist/govuk/components/button/button";

export function ConfigureOverallButton(
  $scope?: Document | Element,
  config?: ButtonConfig,
) {
  createAll(Button, config, $scope);
}
