import { PageDataSchema } from "@/components/fabric/fabric.ts";
import pageDataJSON from "./page.json";

export const pageData = PageDataSchema.safeParse(pageDataJSON);
