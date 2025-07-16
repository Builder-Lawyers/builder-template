import type { Plugin } from "vite";
import { parse } from "@astrojs/compiler";
import { walk, is } from "@astrojs/compiler/utils";
import fs from "fs";

export function AstroPropsInjector(): Plugin {
  return {
    name: "astro-props-injector",

    async transform(src, id) {
      if (!id.endsWith(".astro")) return;

      const source = fs.readFileSync(id, "utf8");

      const result = await parse(source, {
        position: false,
      });

      walk(result.ast, (node) => {
        if (is.tag(node)) {
          console.log(node);
        }
      });
    },
  };
}
