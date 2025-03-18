import type { ArgTypes, Tag } from "@storybook/csf";

type AnyJson =
  | boolean
  | number
  | string
  | null
  | Array<AnyJson>
  | JsonMap
  | React.ReactNode
  | undefined;
interface JsonMap {
  [key: string]: AnyJson;
}

interface AnnotationsConfig {
  parameters?: JsonMap;
  args?: JsonMap;
  argTypes?: ArgTypes;
  tags?: Tag[];
  // FIXME: need ArrowFunctionExpression in magicast
  // decorators?: JSAnnotation[];
  // loaders?: JSAnnotation[];
  // render?: JSAnnotation;
  // play?: JSAnnotation;
}
export interface MetaConfig extends AnnotationsConfig {
  title?: string;
}
export interface StoryConfig extends AnnotationsConfig {
  name?: string;
}
export type StoryConfigs = Record<string, StoryConfig>;

export interface DynamicConfig {
  baseCsf: string;
  storiesCsf?: string;
  stories?: () => Promise<StoryConfigs> | StoryConfigs;
}

export interface ComponentFixture {
  name: string;
  options?: object;
  hidden?: boolean;
  description?: string;
  previewLayoutModifiers?: unknown[];
  screenshot?: boolean;
  html?: string;
}

export interface ComponentFixtureRoot {
  component: string;
  fixtures: ComponentFixture[];
}
