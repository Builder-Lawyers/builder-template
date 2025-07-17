import { PageDataSchema } from "@/components/fabric/fabric.ts";
import pageDataJSON from "./_page.json";

export const pageData = PageDataSchema.safeParse(pageDataJSON);
