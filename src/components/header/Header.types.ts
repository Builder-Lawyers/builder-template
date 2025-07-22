import { z } from "zod";
import { baseWidgetSchema } from "@/components/fabric/shemaDefault.ts";

export const schema = baseWidgetSchema.extend({
  title: z.string(),
  navigation: z
    .array(z.object({ label: z.string(), href: z.string() }))
    .optional(),
  buttons: z
    .array(z.object({ label: z.string(), href: z.string() }))
    .optional(),
});

export type HeaderProps = z.infer<typeof schema>;
