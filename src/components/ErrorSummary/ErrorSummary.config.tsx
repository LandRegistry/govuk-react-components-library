import { ErrorSummary, createAll } from "govuk-frontend";
import { ErrorSummaryConfig } from "govuk-frontend/dist/govuk/components/error-summary/error-summary";

export function ConfigureOverallErrorSummary(
  $scope?: Document | Element,
  config?: ErrorSummaryConfig,
) {
  createAll(ErrorSummary, config, $scope);
}
