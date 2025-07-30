import type { Indexer } from "storybook/internal/types";
import { loadCsf } from "storybook/internal/csf-tools";
import { serverRequire } from "storybook/internal/common";
import { compile } from "./compile";
import { vite, webpack, rollup, STORIES_REGEX } from "./unplugin";

const logger = console;

export const dynamicIndexer: Indexer = {
  test: STORIES_REGEX,
  createIndex: async (fileName, options) => {
    logger.log("indexing", fileName);
    delete require.cache[fileName];
    const config = await serverRequire(fileName);
    const compiled = await compile(config);
    const indexed = loadCsf(compiled, {
      ...options,
      fileName,
    }).parse();

    return indexed.indexInputs;
  },
};

export const experimental_indexers: Indexer[] = [dynamicIndexer];

export const viteFinal = async (config: any) => {
  const { plugins = [] } = config;
  plugins.push(vite({}));
  config.plugins = plugins;
  return config;
};

export const webpackFinal = async (config: any) => {
  const { plugins = [] } = config;
  plugins.push(webpack({}));
  config.plugins = plugins;
  return config;
};

export const rollupFinal = async (config: any) => {
  const { plugins = [] } = config;
  plugins.push(rollup({}));
  config.plugins = plugins;
  return config;
};
