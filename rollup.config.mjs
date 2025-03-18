import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json" assert { type: "json" };
import analyze from "rollup-plugin-analyzer";
import { visualizer } from "rollup-plugin-visualizer";

const isProduction = process.env.NODE_ENV === "production";
const externalDeps = Object.keys(pkg.peerDependencies || {});

const createConfig = (input, output) => ({
  input,
  output: [
    {
      file: output.cjs,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: output.esm,
      format: "esm",
      sourcemap: true,
    },
  ],
  external: [...externalDeps, ...output.externalLibs],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*stories.tsx"],
    }),
    postcss({
      minimize: isProduction,
      extract: true,
    }),
    isProduction && terser(),
    analyze({ summaryOnly: true }),
    visualizer({
      filename: output.analysis,
      open: false,
    }),
  ],
});

export default [
  createConfig("src/index.ts", {
    cjs: pkg.main,
    esm: pkg.module,
    analysis: "bundle-analysis-main.html",
    externalLibs: ["react/jsx-runtime"],
  }),
  createConfig("src/PDFViewerCanvas.ts", {
    cjs: "dist/PDFViewerCanvas.cjs.js",
    esm: "dist/PDFViewerCanvas.esm.js",
    analysis: "bundle-analysis-pdfvc.html",
    externalLibs: ["pdfjs-dist/webpack.mjs", "pdfjs-dist"],
  }),
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/, /\.scss$/],
    plugins: [dts()],
  },
  {
    input: "src/PDFViewerCanvas.ts",
    output: [{ file: "dist/PDFViewerCanvas.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
