#!/usr/bin/env node
/**
 * scripts/generateStories.mjs
 *
 * Generates *.stories.tsx files from govuk-frontend fixtures.json files.
 * Each non-hidden fixture becomes its own top-level named export — the only
 * format Storybook's CSF parser supports for individual sidebar entries.
 *
 * Also reports any govuk-frontend components that have no matching folder in
 * src/components/, so new upstream components are never silently missed.
 *
 * Usage:
 *   node scripts/generateStories.mjs
 *   node scripts/generateStories.mjs --component=Accordion
 *   node scripts/generateStories.mjs --framework=react-webpack5
 *   node scripts/generateStories.mjs --framework=react-vite
 *
 * The --framework flag overrides auto-detection from package.json.
 * Auto-detection checks devDependencies for @storybook/react-webpack5
 * or @storybook/react-vite and picks whichever is present.
 *
 * Add to package.json:
 *   "generate-stories":    "node scripts/generateStories.mjs",
 *   "prestorybook":        "npm run generate-stories",
 *   "prebuild-storybook":  "npm run generate-stories"
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as prettier from "prettier";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COMPONENTS_DIR = path.join(ROOT, "src", "components");
const GOVUK_FIXTURES_BASE = path.join(
  ROOT,
  "node_modules",
  "govuk-frontend",
  "dist",
  "govuk",
  "components",
);

// ---------------------------------------------------------------------------
// Storybook framework detection
//
// Determines which @storybook package to import Meta/StoryObj from.
// Override by passing --framework=react-webpack5 or --framework=react-vite.
// If not specified, auto-detects from the installed packages.
// ---------------------------------------------------------------------------
function detectStorybookFramework() {
  const frameworkArg = process.argv.find((a) => a.startsWith("--framework="));
  if (frameworkArg) return frameworkArg.split("=")[1];

  const pkgPath = path.join(ROOT, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  };

  if (allDeps["@storybook/react-webpack5"]) return "react-webpack5";
  if (allDeps["@storybook/react-vite"]) return "react-vite";

  // fallback
  return "react-webpack5";
}

const STORYBOOK_FRAMEWORK = detectStorybookFramework();

// ---------------------------------------------------------------------------
// Fixture name overrides
//
// By default the script converts a component folder name to kebab-case and
// looks for a matching govuk-frontend fixtures.json:
//   "CookieBanner" → "cookie-banner" → .../cookie-banner/fixtures.json
//
// If a component folder name does NOT map cleanly to its govuk-frontend name,
// add an entry here:
//   "MyFolderName": "govuk-fixture-name"
// ---------------------------------------------------------------------------
const FIXTURE_NAME_OVERRIDES = {
  // Example:
  // "ErrorSummary": "error-summary",
};

// ---------------------------------------------------------------------------
// Per-component customisation
//
// Components whose folder contains a {Component}.config.ts[x] file receive a
// standard configuration decorator automatically — no entry needed here.
//
// Only add an entry here if a component needs something beyond the standard
// config-file decorator (e.g. completely different decorator logic, additional
// imports on top of the config import, etc.).  Entries here are deep-merged
// with — and take precedence over — the auto-generated config.
// ---------------------------------------------------------------------------
const CUSTOM_CONFIG = {};

// ---------------------------------------------------------------------------
// Generation skip list
//
// Add a component folder name here when its stories are hand-authored and
// must never be overwritten by this script.
//
// Why a component ends up here:
//   The govuk-frontend fixture props are designed for the server-side Nunjucks
//   template and don't map to the React component's API.  Feeding them through
//   extractShownFixtures produces undefined/NaN values at runtime.
//   Hand-authored stories use the real React props directly instead.
// ---------------------------------------------------------------------------
const GENERATION_SKIP = new Set([
  // Add component folder names here if their stories must be hand-authored.
  // See comment block above for guidance on when this is needed.
]);

// ---------------------------------------------------------------------------
// Config-file auto-detection
//
// If a component folder contains {Component}.config.ts or .config.tsx the
// generator injects:
//   • an import for the Configure function
//   • a `let configured = false` guard (prevents double-init in docs mode)
//   • a decorator that calls the function on every story render, but only
//     once per page-load when Storybook is showing the auto-docs page.
//
// The docs-mode URL pattern changed in Storybook 8:
//   old: ?viewMode=docs
//   new: ?path=/docs/govuk-design-system-{kebab}--docs
// ---------------------------------------------------------------------------

/** Returns true when the component folder has a .config.ts or .config.tsx file. */
function hasConfigFile(componentName) {
  const dir = path.join(COMPONENTS_DIR, componentName);
  return (
    fs.existsSync(path.join(dir, `${componentName}.config.ts`)) ||
    fs.existsSync(path.join(dir, `${componentName}.config.tsx`))
  );
}

/**
 * Builds the standard CUSTOM_CONFIG-shaped object for any component that has
 * a config file.  The caller can then merge this with an explicit CUSTOM_CONFIG
 * entry when one exists.
 */
function buildConfigFileCustomisation(componentName) {
  const kebab = resolveFixtureName(componentName);
  const fnName = `ConfigureOverall${componentName}`;
  const docsPath = `path=/docs/govuk-design-system-${kebab}--docs`;

  return {
    extraImports: `import { ${fnName} } from "./${componentName}.config";`,
    extraSetup: `\nlet configured = false;`,
    decorator: `(Story, { parameters }) => {
      React.useEffect(() => {
        const isDocsMode = window.location.search.includes("${docsPath}");
        if (isDocsMode && !configured && parameters.initializeConfigurations) {
          void ${fnName}();
          configured = true;
        } else if (!isDocsMode) {
          void ${fnName}();
        }
      }, []);
      return <Story />;
    }`,
  };
}

/** Returns the resolved customisation for a component (auto + manual merged). */
function resolveCustomConfig(componentName) {
  const auto = hasConfigFile(componentName)
    ? buildConfigFileCustomisation(componentName)
    : null;
  const manual = CUSTOM_CONFIG[componentName] ?? null;

  if (!auto && !manual) return null;
  // Manual entries win — they can override individual keys (e.g. decorator)
  // while still inheriting auto-generated imports/setup when not specified.
  return { ...auto, ...manual };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** "with all sections already open" → "WithAllSectionsAlreadyOpen" */
function toExportName(name) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

/** "CookieBanner" → "cookie-banner" */
function toKebabCase(name) {
  return name
    .replace(/([A-Z])/g, (m, l, i) => (i === 0 ? l : `-${l}`).toLowerCase())
    .toLowerCase();
}

/** "cookie-banner" → "CookieBanner" */
function toPascalCase(kebab) {
  return kebab
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

/** "file-upload" → "File upload"  |  "cookie-banner" → "Cookie banner" */
function toTitleLabel(kebab) {
  const words = kebab.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function resolveFixtureName(componentName) {
  return FIXTURE_NAME_OVERRIDES[componentName] ?? toKebabCase(componentName);
}

function getVisibleFixtures(componentName) {
  const fixtureName = resolveFixtureName(componentName);
  const fixturePath = path.join(
    GOVUK_FIXTURES_BASE,
    fixtureName,
    "fixtures.json",
  );
  if (!fs.existsSync(fixturePath)) return null;
  const { fixtures } = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
  return fixtures.filter((f) => f.hidden === false);
}

function getAllGovukComponents() {
  if (!fs.existsSync(GOVUK_FIXTURES_BASE)) return [];
  return fs
    .readdirSync(GOVUK_FIXTURES_BASE, { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        fs.existsSync(path.join(GOVUK_FIXTURES_BASE, d.name, "fixtures.json")),
    )
    .map((d) => d.name);
}

// ---------------------------------------------------------------------------
// File generator
//
// The generated file imports fixtures and calls extractShownFixtures at
// runtime — this is intentional. extractShownFixtures transforms the raw
// govuk-frontend fixture data (e.g. `text` → `children`, `classes` →
// `className`) into props the React components actually accept. Inlining the
// raw JSON as args would cause TypeScript errors like:
//   "text does not exist in type { children: ReactNode }"
// because the component types expect the already-transformed prop names.
// ---------------------------------------------------------------------------
function generateFile(componentName, visibleFixtures) {
  const fixtureName = resolveFixtureName(componentName);
  const custom = resolveCustomConfig(componentName);
  const hasScss = fs.existsSync(
    path.join(COMPONENTS_DIR, componentName, `${componentName}.scss`),
  );

  const decorator =
    custom?.decorator ??
    `(Story) => {
      return <Story />;
    }`;

  // Each story references its fixture by name at runtime so extractShownFixtures
  // can transform it. The index lookup is intentionally avoided — name-based
  // lookup means stories stay correct even if govuk-frontend reorders fixtures.
  const storyExports = visibleFixtures
    .map((fixture) => {
      const exportName = toExportName(fixture.name);
      return [
        `export const ${exportName}: Story = {`,
        `  name: "${fixture.name}",`,
        `  args: { ...examplesFromFixtures.find((f) => f.name === "${fixture.name}")?.options },`,
        `};`,
      ].join("\n");
    })
    .join("\n\n");

  return [
    `// THIS FILE IS AUTO-GENERATED — do not edit manually.`,
    `// Source: node_modules/govuk-frontend/dist/govuk/components/${fixtureName}/fixtures.json`,
    `// Regenerate: npm run generate-stories`,
    ``,
    `import React from "react";`,
    hasScss ? `import "./${componentName}.scss";` : null,
    `import ${componentName} from "./${componentName}";`,
    `import { Meta, StoryObj } from "@storybook/react";`,
    `import fixtures from "govuk-frontend/dist/govuk/components/${fixtureName}/fixtures.json";`,
    `import { extractShownFixtures } from "../../utils/ProcessExampleData";`,
    `import { ComponentFixture } from "../../dynamics";`,
    custom?.extraImports ?? null,
    custom?.extraSetup ?? null,
    `const meta: Meta<typeof ${componentName}> = {`,
    `  title: "GOVUK Design System/${toTitleLabel(fixtureName)}",`,
    `  component: ${componentName},`,
    `  decorators: [${decorator}],`,
    `  tags: ["autodocs"],`,
    `};`,
    ``,
    `export default meta;`,
    `type Story = StoryObj<typeof ${componentName}>;`,
    ``,
    `// extractShownFixtures transforms raw govuk-frontend fixture data into`,
    `// React-compatible props (e.g. text → children, classes → className).`,
    `const examplesFromFixtures: Array<ComponentFixture> = extractShownFixtures(fixtures);`,
    ``,
    storyExports,
  ]
    .filter((line) => line !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const targetArg = process.argv.find((a) => a.startsWith("--component="));
const targetComponent = targetArg?.split("=")[1];

const srcComponentNames = fs
  .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((name) => !targetComponent || name === targetComponent);

const govukComponentKebabs = getAllGovukComponents();

const srcKebabToFolder = Object.fromEntries(
  srcComponentNames.map((name) => [resolveFixtureName(name), name]),
);

const notImplemented = govukComponentKebabs.filter(
  (kebab) => !srcKebabToFolder[kebab],
);

const results = { generated: [], skipped: [], noFixtures: [] };

for (const componentName of srcComponentNames) {
  if (GENERATION_SKIP.has(componentName)) {
    results.skipped.push({
      componentName,
      reason: "hand-authored stories (GENERATION_SKIP)",
    });
    continue;
  }

  const fixtures = getVisibleFixtures(componentName);
  const fixtureName = resolveFixtureName(componentName);

  if (!fixtures) {
    results.noFixtures.push({ componentName, fixtureName });
    continue;
  }

  if (fixtures.length === 0) {
    results.skipped.push({ componentName, reason: "all fixtures are hidden" });
    continue;
  }

  const outputPath = path.join(
    COMPONENTS_DIR,
    componentName,
    `${componentName}.stories.tsx`,
  );

  // Formatted here (rather than left for a separate `npm run format` pass)
  // so the output always matches what `npm run lint` expects - this script
  // runs on every `npm run storybook` via the `prestorybook` hook, and
  // unformatted output would fail lint the moment someone commits it.
  const formatted = await prettier.format(
    generateFile(componentName, fixtures),
    { parser: "typescript", filepath: outputPath },
  );

  // Skip the write when content is unchanged, so a plain `npm run storybook`
  // restart doesn't touch every story file's mtime (noisy for file watchers
  // and git status) when nothing upstream has actually changed.
  const existing = fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, "utf8")
    : null;
  if (existing !== formatted) {
    fs.writeFileSync(outputPath, formatted, "utf8");
  }
  results.generated.push({ componentName, count: fixtures.length });
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log("\n📖 Story generation report\n");
console.log(`   Storybook framework: @storybook/${STORYBOOK_FRAMEWORK}`);

if (results.generated.length) {
  console.log("✅ Generated:");
  results.generated.forEach(({ componentName, count }) =>
    console.log(
      `   ${componentName}.stories.tsx  (${count} ${count === 1 ? "story" : "stories"})`,
    ),
  );
}

if (results.skipped.length) {
  console.log("\n⚠️  Skipped (fixtures exist but all are hidden):");
  results.skipped.forEach(({ componentName, reason }) =>
    console.log(`   ${componentName}  — ${reason}`),
  );
}

if (results.noFixtures.length) {
  console.log(
    "\n⬜ No govuk-frontend fixtures (custom components — expected):",
  );
  results.noFixtures.forEach(({ componentName, fixtureName }) =>
    console.log(
      `   ${componentName}  →  looked for: ${fixtureName}/fixtures.json`,
    ),
  );
  console.log(
    "\n   💡 If any of the above should have fixtures, add an entry to",
    "\n      FIXTURE_NAME_OVERRIDES in scripts/generateStories.mjs",
  );
}

if (notImplemented.length && !targetComponent) {
  console.log(
    "\n🆕 govuk-frontend components not yet in src/components/ (consider implementing):",
  );
  notImplemented.forEach((kebab) =>
    console.log(
      `   ${kebab}  →  suggested folder name: ${toPascalCase(kebab)}`,
    ),
  );
  console.log(
    "\n   💡 These are govuk-frontend components that exist upstream but have",
    "\n      no matching folder in src/components/. Create the component folder",
    "\n      and re-run this script to generate its stories automatically.",
  );
}

console.log(
  `\nDone — ${results.generated.length} generated, ${results.skipped.length} skipped, ` +
    `${results.noFixtures.length} have no govuk-frontend fixtures, ` +
    `${notImplemented.length} govuk-frontend component(s) not yet implemented.\n`,
);
