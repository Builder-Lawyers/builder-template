import type { WidgetMap } from "@/components";

export type Widget = {
  [K in keyof WidgetMap]: {
    type: K;
    props: WidgetMap[K];
  };
}[keyof WidgetMap];

export type Page = {
  title: string;
  slug: string | undefined;
  widgets: Widget[];
};

export type PageData = {
  pages: Page[];
};

type AstroComponent<Props> = (props: Props) => any;

const modules = import.meta.glob<{ default: AstroComponent<any> }>(
  "../*/**/*.astro",
  { eager: true },
);

export const astroFactory: Record<string, AstroComponent<any>> = {};

for (const path in modules) {
  const key = path.split("/").pop()?.replace(".astro", "").toLowerCase();

  if (key) astroFactory[key] = modules[path].default;
}
