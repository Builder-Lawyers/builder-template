import { z, type ZodObject } from "zod";
import type { ZodTypeAny } from "zod/v3";

export function createWidgetSchemaFrom(
  modules: Record<string, Record<string, unknown>>,
) {
  const widgets = Object.entries(modules).map(([path, mod]) => {
    const type = path.split("/").pop()?.split(".")[0]?.toLowerCase();
    if (!type) throw new Error(`Can't get types from: ${path}`);

    const schema = Object.values(mod).find(
      (v) =>
        typeof v === "object" &&
        v !== null &&
        typeof (v as any).safeParse === "function",
    );

    if (!schema) {
      throw new Error(`File ${path} doesn't export a valid schema.`);
    }

    return z.object({
      type: z.literal(type),
      props: schema as ZodObject<any>,
    });
  });

  if (widgets.length === 0) {
    throw new Error("Widget schema is empty.");
  }

  return z.discriminatedUnion(
    "type",
    widgets as [ZodObject<any>, ...ZodObject<any>[]],
  );
}

const schemaModules = import.meta.glob<{ schema: ZodTypeAny }>(
  "../*/**/*.types.ts",
  { eager: true },
);

export const WidgetSchema = createWidgetSchemaFrom(schemaModules);

export const PageSchema = z.object({
  title: z.string(),
  slug: z.string().optional().nullable(),
  widgets: z.array(WidgetSchema),
});

export const PageDataSchema = z.object({
  header: WidgetSchema,
  pages: z.array(PageSchema),
});

const modules = import.meta.glob<{ default: AstroComponent<any> }>(
  "../*/**/*.astro",
  { eager: true },
);

type AstroComponent<Props> = (props: Props) => any;

export const astroFactory: Record<string, AstroComponent<any>> = {};

for (const path in modules) {
  const key = path.split("/").pop()?.replace(".astro", "").toLowerCase();

  if (key) astroFactory[key] = modules[path].default;
}

export type Page = z.infer<typeof PageSchema>;
export type PageData = z.infer<typeof PageDataSchema>;
export type Widget = z.infer<typeof WidgetSchema>;
