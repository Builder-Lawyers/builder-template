import z from "zod";

export const baseWidgetSchema = z.object({
  id: z.string(),
});
