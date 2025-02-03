import { defineContentConfig, defineCollection } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "blogs/*.md",
    }),
    author: defineCollection({
      type: "page",
      source: "author/*.md",
    }),
  },
});
