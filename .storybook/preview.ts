import type { Preview } from "@storybook/react-vite";
import "../src/index.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Optional selector to inspect
      context: "#storybook-root",
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: "autocomplete-valid",
            selector: '*:not([autocomplete="nope"])',
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: "image-alt",
            enabled: false,
          },
        ],
      },
      // Axe's options parameter
      options: {},
      // Optional flag to prevent the automatic check
      manual: true,
      // Fails @storybook/test-runner's a11y check (see the `accessibility`
      // CI job in .github/workflows/ci.yml) instead of just logging a
      // warning - the library has 0 known violations as of the audit that
      // added full story coverage, so this now gates future regressions.
      test: "error",
    },
  },

  tags: ["autodocs"],
};

export default preview;
