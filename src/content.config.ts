import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * notes collection
 *
 * 對應五層知識模型：domain / subdomain / topic / concept / skill。
 * 結構是邏輯的而非物理的，所以多數欄位是 optional。
 *
 * slug 由檔案路徑自動推導，例如：
 *   src/content/notes/powershell/rename-item/path.md
 *     -> slug: "powershell/rename-item/path"
 */
const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),

    // 五層邏輯定位
    domain: z.string(),
    subdomain: z.string().optional(),
    topic: z.string().optional(),
    concept: z.string().optional(),
    skill: z.string().optional(),

    tags: z.array(z.string()).default([]),
    status: z.enum(["draft", "review", "stable"]).default("draft"),

    // 同 topic 內排序（小到大）
    order: z.number().optional(),

    // 相關內部筆記（用 slug 引用，例如 "powershell/rename-item/newname"）
    related: z.array(z.string()).default([]),

    // 官方/外部參考
    externalReferences: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { notes };
