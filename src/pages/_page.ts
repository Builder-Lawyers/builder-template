import { PageDataSchema } from "@/components/fabric/fabric.ts";
import pageDataRaw from "./_page.json";

export const pageData = PageDataSchema.safeParse(pageDataRaw);
