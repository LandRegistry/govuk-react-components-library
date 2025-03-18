import processExampleData, { extractShownFixtures } from "./ProcessExampleData";
import { titleCase, titleCaseNoSpace } from "./TitleCase";

describe("processExampleData", () => {
  const exampleData = [
    {
      text: "Example text",
      classes: "my-class",
      attributes: { colspan: 2, for: "inputId" },
    },
  ];

  test("replaces prop names correctly", () => {
    const result = processExampleData(exampleData, "example-component");
    expect(result[0]).toHaveProperty("className", "my-class");
    expect(result[0]).toHaveProperty("colSpan", "2");
    expect(result[0]).toHaveProperty("htmlFor", "inputId");
  });

  test("processes HTML content", () => {
    const htmlData = [{ descriptionHtml: "<p>HTML content</p>" }];
    const result = processExampleData(htmlData, "example-component");
    expect(result[0]).toHaveProperty("descriptionChildren");
  });

  test("handles table component logic", () => {
    const tableData = [{ rows: [["cell1", "cell2"]] }];
    const result = processExampleData(tableData, "table");
    expect(result[0].rows[0]).toHaveProperty("cells");
  });
});

describe("extractShownFixtures", () => {
  const fixtures = {
    fixtures: [
      { hidden: false, text: "Visible fixture" },
      { hidden: true, text: "Hidden fixture" },
    ],
    component: "example-component",
  };

  test("extracts only visible fixtures", () => {
    const result = extractShownFixtures(fixtures);
    expect(result).toHaveLength(1);
    expect(result[0].children).toBe("Visible fixture");
  });
});

describe("titleCase", () => {
  test("converts to title case", () => {
    expect(titleCase("hello world")).toBe("Hello World");
  });
});

describe("titleCaseNoSpace", () => {
  test("converts to title case without spaces", () => {
    expect(titleCaseNoSpace("hello world")).toBe("HelloWorld");
  });
});
