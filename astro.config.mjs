// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const SITE = "https://Beny942k6xu4.github.io";
const BASE = "/Practical-Collections/";

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "always",
  integrations: [mdx(), sitemap()],
});
