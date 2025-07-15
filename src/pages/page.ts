import type { PageData } from "@/components/fabric.ts";

export const pageData: PageData = {
  widgets: [
    {
      type: "header",
      props: {
        title: "Builder Test",
        navigation: [{ label: "Home", href: "/" }],
        buttons: [{ label: "Click me", href: "/" }],
      },
    },
  ],
};
