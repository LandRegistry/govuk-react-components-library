import {
  AccordionConfig,
  AccordionTranslations,
} from "govuk-frontend/dist/govuk/components/accordion/accordion";
import { Accordion, createAll } from "govuk-frontend";

export function ConfigureOverallAccordion(
  $scope?: Document | Element,
  config?: AccordionConfig,
) {
  if (JSON.stringify(config) === JSON.stringify({})) {
    config = Accordion.defaults;
  }
  createAll(Accordion, config, $scope);
}

export function ExtractAccordionConfigFromAttributes(remainingAttributes: {
  [key: string]: unknown;
}): AccordionConfig {
  const accordionTranslations: AccordionTranslations = {};
  if (remainingAttributes?.hideAllSectionsText) {
    Object.assign(accordionTranslations, {
      hideAllSections: remainingAttributes.hideAllSectionsText as string,
    });
    remainingAttributes["data-i18n.hide-all-sections"] =
      remainingAttributes.hideAllSectionsText;
    delete remainingAttributes.hideAllSectionsText;
  }

  if (remainingAttributes?.hideSectionText) {
    Object.assign(accordionTranslations, {
      hideSection: remainingAttributes.hideSectionText as string,
    });
    remainingAttributes["data-i18n.hide-section"] =
      remainingAttributes.hideSectionText;
    delete remainingAttributes.hideSectionText;
  }

  if (remainingAttributes?.hideSectionAriaLabelText) {
    Object.assign(accordionTranslations, {
      hideSectionAriaLabel:
        remainingAttributes.hideSectionAriaLabelText as string,
    });
    remainingAttributes["data-i18n.hide-section-aria-label"] =
      remainingAttributes.hideSectionAriaLabelText;
    delete remainingAttributes.hideSectionAriaLabelText;
  }

  if (remainingAttributes?.showAllSectionsText) {
    Object.assign(accordionTranslations, {
      showAllSections: remainingAttributes.showAllSectionsText as string,
    });
    remainingAttributes["data-i18n.show-all-sections"] =
      remainingAttributes.showAllSectionsText;
    delete remainingAttributes.showAllSectionsText;
  }

  if (remainingAttributes?.showSectionText) {
    Object.assign(accordionTranslations, {
      showSection: remainingAttributes.showSectionText as string,
    });
    remainingAttributes["data-i18n.show-section"] =
      remainingAttributes.showSectionText;
    delete remainingAttributes.showSectionText;
  }

  if (remainingAttributes?.showSectionAriaLabelText) {
    Object.assign(accordionTranslations, {
      showSectionAriaLabel:
        remainingAttributes.showSectionAriaLabelText as string,
    });
    remainingAttributes["data-i18n.show-section-aria-label"] =
      remainingAttributes.showSectionAriaLabelText;
    delete remainingAttributes.showSectionAriaLabelText;
  }
  const accordionConfig: AccordionConfig = { i18n: accordionTranslations };
  if (remainingAttributes?.rememberExpanded) {
    Object.assign(accordionConfig, {
      rememberExpanded: remainingAttributes.rememberExpanded as boolean,
    });
    remainingAttributes["data-remember-expanded"] =
      remainingAttributes.rememberExpanded;
    delete remainingAttributes.rememberExpanded;
  }

  return accordionConfig;
}
