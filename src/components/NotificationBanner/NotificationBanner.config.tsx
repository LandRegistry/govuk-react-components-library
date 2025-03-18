import { NotificationBanner, createAll } from "govuk-frontend";
import { NotificationBannerConfig } from "govuk-frontend/dist/govuk/components/notification-banner/notification-banner";

export function ConfigureOverallNotificationBanner(
  $scope?: Document | Element,
  config?: NotificationBannerConfig,
) {
  createAll(NotificationBanner, config, $scope);
}
