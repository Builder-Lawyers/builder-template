import { z } from "zod";

export const schema = z.object({
  title: z.string(),
  navigation: z
    .array(z.object({ label: z.string(), href: z.string() }))
    .optional(),
  buttons: z
    .array(z.object({ label: z.string(), href: z.string() }))
    .optional(),
});

export type HeaderProps = z.infer<typeof schema>;
