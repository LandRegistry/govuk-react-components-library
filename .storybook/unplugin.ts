import { createUnplugin } from "unplugin";
import { serverRequire } from "storybook/internal/common";
import { compile, CompileOptions } from "./compile";

export const STORIES_REGEX = /\.dynamicstories\.[tj]sx?/;

const logger = console;

export const unplugin = createUnplugin<CompileOptions>((options) => {
  return {
    name: "unplugin-dynamic-stories",
    enforce: "pre",
    loadInclude(id) {
      return STORIES_REGEX.test(id);
    },
    async load(fileName) {
      delete require.cache[fileName];
      const config = await serverRequire(fileName);
      const result = await compile(config, options);
      logger.log(`\n${fileName}\n`);
      logger.log(`\n${result}\n`);
      return result;
    },
  };
});

export const { esbuild } = unplugin;
export const { webpack } = unplugin;
export const { rollup } = unplugin;
export const { vite } = unplugin;
