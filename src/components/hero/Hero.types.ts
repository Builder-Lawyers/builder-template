import { z } from "zod";

export const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  buttons: z
    .array(
      z.object({
        href: z.string().optional(),
        label: z.string(),
      }),
    )
    .optional(),
});

export type HeroProps = z.infer<typeof schema>;
