import { expect, describe, test } from "@jest/globals";
import {
  ConfigureOverallAccordion,
  ExtractAccordionConfigFromAttributes,
} from "./Accordion.config";

describe("Accordion.config", () => {
  describe("ConfigureOverallAccordion", () => {
    test("runs without a scope or config and does not throw", () => {
      expect(() => ConfigureOverallAccordion()).not.toThrow();
    });

    test("falls back to Accordion.defaults when passed an empty config", () => {
      expect(() => ConfigureOverallAccordion(document, {})).not.toThrow();
    });

    test("initialises matching elements within a given scope", () => {
      document.body.innerHTML = `
        <div class="govuk-accordion" data-module="govuk-accordion" id="accordion-default">
          <div class="govuk-accordion__section">
            <div class="govuk-accordion__section-header">
              <h2 class="govuk-accordion__section-heading">
                <span class="govuk-accordion__section-button" id="accordion-default-heading-1">Section 1</span>
              </h2>
            </div>
            <div id="accordion-default-content-1" class="govuk-accordion__section-content">
              <p>Content</p>
            </div>
          </div>
        </div>
      `;
      expect(() =>
        ConfigureOverallAccordion(document, { rememberExpanded: false }),
      ).not.toThrow();
    });
  });

  describe("ExtractAccordionConfigFromAttributes", () => {
    test("returns an empty i18n config when no relevant attributes are present", () => {
      const remainingAttributes: { [key: string]: unknown } = {
        someOtherAttribute: "value",
      };
      const config = ExtractAccordionConfigFromAttributes(remainingAttributes);
      expect(config).toEqual({ i18n: {} });
      expect(remainingAttributes).toEqual({ someOtherAttribute: "value" });
    });

    test("extracts hideAllSectionsText into i18n and data attribute", () => {
      const remainingAttributes: { [key: string]: unknown } = {
        hideAllSectionsText: "Hide all sections",
      };
      const config = ExtractAccordionConfigFromAttributes(remainingAttributes);
      expect(config.i18n?.hideAllSections).toEqual("Hide all sections");
      expect(remainingAttributes["data-i18n.hide-all-sections"]).toEqual(
        "Hide all sections",
      );
      expect(remainingAttributes.hideAllSectionsText).toBeUndefined();
    });

    test("extracts hideSectionText into i18n and data attribute", () => {
      const remainingAttributes: { [key: string]: unknown } = {
        hideSectionText: "Hide",
      };
      const config = ExtractAccordionConfigFromAttributes(remainingAttributes);
      expect(config.i18n?.hideSection).toEqual("Hide");
      expect(remainingAttributes["data-i18n.hide-section"]).toEqual("Hide");
      expect(remainingAttributes.hideSectionText).toBeUndefined();
    });

    test("extracts hideSectionAriaLabelText into i18n and data attribute", () => {
      const remainingAttributes: { [key: string]: unknown } = {
        hideSectionAriaLabelText: "Hide this section",
      };
      const config = ExtractAccordionConfigFromAttributes(remainingAttributes);
      expect(config.i18n?.hideSectionAriaLabel).toEqual("Hide this section");
      expect(remainingAttributes["data-i18n.hide-section-aria-label"]).toEqual(
        "Hide this section",
      );
      expect(remainingAttributes.hideSectionAriaLabelText).toBeUndefined();
    });

    test("extracts showAllSectionsText into i18n and data attribute", () => {
      const remainingAttributes: { [key: string]: unknown } = {
        showAllSectionsText: "Show all sections",
      };
      const config = ExtractAccordionConfigFromAttributes(remainingAttributes);
      expect(config.i18n?.showAllSections).toEqual("Show all sections");
      expect(remainingAttributes["data-i18n.show-all-sections"]).toEqual(
        "Show all sections",
      );
      expect(remainingAttributes.showAllSectionsText).toBeUndefined();
    });

    test("extracts showSectionText into i18n and data attribute", () => {
      const remainingAttributes: { [key: string]: unknown } = {
        showSectionText: "Show",
      };
      const config = ExtractAccordionConfigFromAttributes(remainingAttributes);
      expect(config.i18n?.showSection).toEqual("Show");
      expect(remainingAttributes["data-i18n.show-section"]).toEqual("Show");
      expect(remainingAttributes.showSectionText).toBeUndefined();
    });

    test("extracts showSectionAriaLabelText into i18n and data attribute", () => {
      const remainingAttributes: { [key: string]: unknown } = {
        showSectionAriaLabelText: "Show this section",
      };
      const config = ExtractAccordionConfigFromAttributes(remainingAttributes);
      expect(config.i18n?.showSectionAriaLabel).toEqual("Show this section");
      expect(remainingAttributes["data-i18n.show-section-aria-label"]).toEqual(
        "Show this section",
      );
      expect(remainingAttributes.showSectionAriaLabelText).toBeUndefined();
    });

    test("extracts rememberExpanded into config and data attribute", () => {
      const remainingAttributes: { [key: string]: unknown } = {
        rememberExpanded: true,
      };
      const config = ExtractAccordionConfigFromAttributes(remainingAttributes);
      expect(config.rememberExpanded).toEqual(true);
      expect(remainingAttributes["data-remember-expanded"]).toEqual(true);
      expect(remainingAttributes.rememberExpanded).toBeUndefined();
    });

    test("extracts all translation attributes together", () => {
      const remainingAttributes: { [key: string]: unknown } = {
        hideAllSectionsText: "Hide all",
        hideSectionText: "Hide",
        hideSectionAriaLabelText: "Hide aria",
        showAllSectionsText: "Show all",
        showSectionText: "Show",
        showSectionAriaLabelText: "Show aria",
        rememberExpanded: true,
      };
      const config = ExtractAccordionConfigFromAttributes(remainingAttributes);
      expect(config).toEqual({
        i18n: {
          hideAllSections: "Hide all",
          hideSection: "Hide",
          hideSectionAriaLabel: "Hide aria",
          showAllSections: "Show all",
          showSection: "Show",
          showSectionAriaLabel: "Show aria",
        },
        rememberExpanded: true,
      });
      expect(remainingAttributes).toEqual({
        "data-i18n.hide-all-sections": "Hide all",
        "data-i18n.hide-section": "Hide",
        "data-i18n.hide-section-aria-label": "Hide aria",
        "data-i18n.show-all-sections": "Show all",
        "data-i18n.show-section": "Show",
        "data-i18n.show-section-aria-label": "Show aria",
        "data-remember-expanded": true,
      });
    });
  });
});
