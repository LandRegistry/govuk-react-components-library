### Summary Usage of the Refactored Accordion Component

The refactored `Accordion` component is designed to create an accessible, structured, and expandable/collapsible interface for displaying content sections. It's based on the Gov.uk Design System but can be customized or adapted for any accordion-style content presentation.

#### Key Features:

1. **Dynamic Heading Levels**: The component allows you to define the heading level for accessibility and semantic structure. It defaults to an `<h2>` tag, but you can pass any valid heading level.
2. **Expandable Sections**: Each section of the accordion can be expanded or collapsed by clicking the section heading, with content toggled based on the `expanded` prop.
3. **Optional Summary**: Each section can include an optional summary, which provides a brief description or overview of the section's content.
4. **Customizable ID and ClassName**: The accordion accepts an `id` and `className` for styling and identification, supporting integration into larger pages or layouts.
5. **Accessible Markup**: The markup adheres to accessibility best practices, such as using `aria-labelledby` and assigning correct roles to accordion sections.

#### Props:

- **headingLevel**: Defines the heading level of the section headers. Default is `"h2"`.
- **items**: An array of objects that represent each accordion section, including the `heading`, `content`, and optional `summary`.
- **className**: Custom class names to be added to the accordion container.
- **id**: The ID of the accordion, which is used for uniquely identifying sections within the accordion.

#### Example Usage:

```tsx
import React from "react";
import Accordion from "./Accordion";

const accordionItems = [
  {
    reactListKey: "section-1",
    expanded: true,
    heading: { children: "Section 1 Title" },
    content: { children: "This is the content of section 1." },
    summary: { children: "Brief summary of section 1" },
  },
  {
    reactListKey: "section-2",
    expanded: false,
    heading: { children: "Section 2 Title" },
    content: { children: "This is the content of section 2." },
  },
];

const ExampleAccordion = () => (
  <Accordion
    headingLevel="h3"
    items={accordionItems}
    className="custom-accordion-class"
    id="myAccordion"
  />
);

export default ExampleAccordion;
```

#### Explanation:

1. **Accordion Structure**: The accordion is structured with sections that can expand or collapse. Each section can have a heading, optional summary, and content.
2. **Customization**: You can pass any heading level (e.g., `h2`, `h3`) and customize the overall layout using the `className` prop. Additionally, each section can have unique content and summary.
3. **Expanded State**: By default, the first section is expanded (`expanded: true`), and others are collapsed. This behavior can be customized for any section.
4. **Accessibility**: The `id` prop ensures each section’s content is correctly associated with its heading for screen readers.

This component is useful for creating collapsible content sections like FAQs, help topics, or any scenario where you want to reveal more information dynamically.
