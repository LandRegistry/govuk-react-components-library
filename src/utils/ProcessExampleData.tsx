import deepIterator from "deep-iterator";
import parse from "html-react-parser";
import { ComponentFixture, ComponentFixtureRoot } from "../dynamics";
import omit from "../components/Boolean/OmitKey";

const propReplacements: Record<string, string> = {
  classes: "className",
  describedBy: "aria-describedby",
  containerClasses: "containerClassName",
  navigationClasses: "navigationClassName",
  autocomplete: "autoComplete",
  for: "htmlFor",
  captionClasses: "captionClassName",
  colspan: "colSpan",
  rowspan: "rowSpan",
  summaryText: "summaryChildren",
  summaryHtml: "summaryChildren",
  descriptionText: "descriptionChildren",
  descriptionHtml: "descriptionChildren",
  titleText: "titleChildren",
  titleHtml: "titleChildren",
  inputmode: "inputMode",
  serviceUrl: "serviceUrlHref",
  homepageUrl: "homepageUrlHref",
  spellcheck: "spellCheck",
  tabindex: "tabIndex",
  ariaLabel: "aria-label",
  headingText: "headingChildren",
};

function replaceAttributes(
  parent: Record<string, unknown>,
  attributes: unknown,
) {
  if (typeof attributes !== "object" || attributes === null) {
    throw new TypeError("attributes must be an object");
  }

  Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
    const propName = propReplacements[attributeName] || attributeName;
    parent[propName] = attributeValue.toString();
  });
}

function processHtmlAndTextFields(
  parent: unknown,
  key: string,
  value: unknown,
) {
  const endWithHtml = key.toLowerCase().endsWith("html");
  const targetKey =
    endWithHtml && key !== "html"
      ? key.replace("Html", "Children")
      : "children";

  // Only parse if not already an object (avoids redundant parsing)
  parent[targetKey] =
    endWithHtml && typeof value === "string" ? parse(value) : value;
  delete parent[key];
}

function processItems(items: unknown[], keyToRemove: string) {
  return items.map((item) =>
    item && Object.keys(item).length > 0
      ? { ...omit(item, keyToRemove) }
      : item,
  );
}

function processComponentSpecificData(
  parent: unknown,
  key: string,
  value: unknown,
  componentName: string,
) {
  if (componentName === "table" && key === "rows" && !("cells" in value[0])) {
    parent[key] = value.map((row: unknown) => ({ cells: row }));
  } else if (componentName === "radios" && key === "items") {
    const checked = value.find((item: unknown) => item.checked);
    parent.items = processItems(value, "checked");
    if (checked) parent.value = checked.value;
  } else if (componentName === "select" && key === "items") {
    value.forEach((item: unknown) => processComponentData(item, componentName));
    const selected = value.find((item: unknown) => item.selected);
    parent.items = processItems(value, "selected");
    if (selected) parent.value = selected.value;
  } else if (componentName === "cookie-banner" && key === "messages") {
    value.forEach((message: unknown) =>
      processComponentData(message, componentName),
    );
  }
}

function processComponentData(data: unknown, componentName: string): void {
  for (const { parent, value, key } of deepIterator(data)) {
    if (!key || !value) continue;

    // Handle HTML and text replacements
    if (
      typeof value === "string" &&
      (key.toString().toLowerCase().endsWith("html") || key === "text")
    ) {
      processHtmlAndTextFields(parent, key, value);
      continue;
    }

    // Replace props based on mappings
    if (key in propReplacements) {
      parent[propReplacements[key]] = value;
      delete parent[key];
    } else if (key === "attributes") {
      replaceAttributes(parent, value);
      delete parent.attributes;
    } else {
      processComponentSpecificData(parent, key, value, componentName);
    }
  }
}

export default function processExampleData(
  data: unknown,
  componentName: string,
): Array<ComponentFixture> {
  processComponentData(data, componentName);
  return data as Array<ComponentFixture>;
}

export function extractShownFixtures(
  fixtures: ComponentFixtureRoot,
): Array<ComponentFixture> {
  return processExampleData(
    fixtures.fixtures.filter((fixture) => !fixture.hidden),
    fixtures.component,
  ) as Array<ComponentFixture>;
}
