# Practical-Collections

學習用副本：使用 **Astro + Content Collections（不含 Starlight）** 從零搭建的同內容網站。
正式維護版本為 [Practical-Starlight](https://github.com/Beny942k6xu4/Practical-Starlight)。

- 線上網址：<https://Beny942k6xu4.github.io/Practical-Collections/>
- 框架：Astro `6.3.7` + `@astrojs/mdx 5.0.6` + `@astrojs/sitemap 3.7.2`
- Node：`>=20`（CI 用 `22`）
- 套件管理：pnpm `11.0.8`

---

## 本機開發

```powershell
Set-Location "C:\project\server\sites\Practical-Collections"

pnpm install
pnpm dev         # http://localhost:4321/Practical-Collections/
pnpm build
pnpm preview
```

---

## 與 Practical-Starlight 的差異

| 面向 | Practical-Starlight | Practical-Collections（本專案） |
|---|---|---|
| 是否使用 Starlight | ✅ | ❌（純 Astro） |
| sidebar | 寫在 `astro.config.mjs` | 目前用頂部 nav，可擴充 |
| frontmatter schema | Starlight 內建 | 自定 Zod schema（domain/topic/status/related/...） |
| 內部連結 | 相對 markdown 路徑 | frontmatter `related` 陣列 + layout 渲染 |
| 路由 | Starlight 自動產生 | `getStaticPaths` + `[...slug].astro` 動態產生 |
| 客製 UI 工作量 | 低 | 中（需要寫 layout、styles） |
| 學 Astro 程度 | 低 | 高 |

---

## 專案結構

```text
src/
├── content.config.ts             # Zod schema 定義 notes collection
├── content/notes/                # 所有 note markdown 來源
│   └── powershell/rename-item/path.md
├── layouts/
│   ├── BaseLayout.astro          # 全站殼層 + 全域 style
│   └── NoteLayout.astro          # 單篇 note 的渲染 + Related / References
└── pages/
    ├── index.astro               # 首頁：列出所有 notes
    ├── meta/principles.astro
    └── domains/
        ├── [...slug].astro       # 動態：把 collection notes 轉成頁面
        ├── powershell/index.astro              # 領域入口
        └── powershell/rename-item/index.astro  # topic 總覽
```

### 內容流程

1. 在 `src/content/notes/<domain>/<topic>/<concept>.md` 新增 markdown，frontmatter 必須符合 schema。
2. `[...slug].astro` 會自動產生 `/domains/<domain>/<topic>/<concept>/` 路由。
3. topic 索引頁與 domain 索引頁是靜態 `index.astro`，會 `getCollection` 過濾後列出。

---

## 部署流程（GitHub Pages）

### 一次性設定

1. GitHub repo `Practical-Collections`（已建立）。
2. **Settings → Pages → Source** 設為 **GitHub Actions**。
3. **Settings → Actions → General → Workflow permissions** 為 **Read and write permissions**。

### 首次推送

```powershell
Set-Location "C:\project\server\sites\Practical-Collections"

git init -b main
git add .
git commit -m "chore: initial scaffold (Astro + Content Collections)"
git remote add origin git@github.com:Beny942k6xu4/Practical-Collections.git
git push -u origin main
```

### 後續更新

```powershell
git add .
git commit -m "docs: <你的更動>"
git push
```

---

## Source-of-truth 流程

1. 新增 / 修改內容 → **先在 Practical-Starlight 完成**。
2. 同步到本專案：
   - 拷貝 markdown 到 `src/content/notes/<domain>/<topic>/<concept>.md`
   - 補齊 frontmatter：`domain` / `topic` / `concept` / `status` / `order` / `related` / `externalReferences`
3. 若需要新 domain：在 `src/pages/domains/<domain>/index.astro` 新增領域入口（複製 `powershell/index.astro` 模板）。
4. `pnpm build` 驗證 → `git push`。

---

## Schema 速查

```ts
title: string
description?: string
domain: string                 // 必填，例如 "PowerShell"
subdomain?: string
topic?: string                 // 例如 "Rename-Item"
concept?: string               // 例如 "Path"
skill?: string
tags: string[]                 // default []
status: "draft" | "review" | "stable"   // default "draft"
order?: number                 // topic 內排序
related: string[]              // 其他 note 的 slug（不含副檔名）
externalReferences: { label, url }[]
```
