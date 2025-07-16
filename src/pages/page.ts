import type { PageData } from "@/components/fabric/fabric.ts";

export const pageData: PageData = {
  pages: [
    {
      title: "My Page Title",
      slug: undefined,
      widgets: [
        {
          type: "header",
          props: {
            title: "Builder Test",
            navigation: [
              { label: "Home", href: "#" },
              { label: "About me", href: "#" },
              { label: "Services", href: "#" },
            ],
            buttons: [{ label: "Click me", href: "#" }],
          },
        },
      ],
    },
  ],
};
