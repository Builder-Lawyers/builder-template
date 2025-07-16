import type { Plugin } from "vite";
import { parse } from "@astrojs/compiler";
import fs from "fs";

export function AstroPropsInjector(): Plugin {
  return {
    name: "astro-props-injector",
  };
}
