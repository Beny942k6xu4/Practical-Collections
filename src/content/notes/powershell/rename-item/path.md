---
title: Rename-Item -Path
description: 指定要被重新命名的舊項目；Rename-Item 的核心輸入。
domain: PowerShell
topic: Rename-Item
concept: Path
tags: [powershell, rename-item, parameter]
status: stable
order: 1
related: []
externalReferences:
  - label: Rename-Item 官方文件 — Parameters
    url: https://learn.microsoft.com/zh-tw/powershell/module/microsoft.powershell.management/rename-item#parameters
---

## Summary

`-Path` 指定**現在已經存在、要被改名的那個項目**。它是 `Rename-Item` 的核心輸入。

## 參數屬性

| 項目 | 值 |
|---|---|
| 名稱 | `-Path` |
| 型別 | `String` |
| Parameter set | `ByPath` |
| Position | `0` |
| Mandatory | `True` |
| Pipeline (by value) | `True` |
| Pipeline (by property name) | `True` |

## 三種典型用法

### 1. 相對路徑

```powershell
Rename-Item -Path ".\path_alpha.txt" -NewName "path_alpha_done.txt"
```

### 2. 絕對路徑

```powershell
Rename-Item -Path "C:\demo\path_beta.txt" -NewName "path_beta_done.txt"
```

### 3. 由 pipeline 提供

```powershell
Get-ChildItem .\path_pipe.txt | Rename-Item -NewName "path_pipe_done.txt"
```

## 與 `-NewName` 的角色對照

```powershell
Rename-Item -Path ".\old.txt" -NewName "new.txt"
#            ^^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^^
#            舊（必須已存在）    新（同目錄、不含路徑）
```

`-NewName` **不能含路徑**；要搬移用 `Move-Item`。

## Common mistakes

- 把 `-Path` 和 `-NewName` 角色搞反。
- `-NewName` 誤填完整路徑。
- pipeline 寫法又同時指定 `-Path`。
- 用相對路徑寫腳本沒有先 `Set-Location`。

## Observation

`-Path` 設計成 Position 0 + 支援 pipeline by value/by property name，讓三種寫法都自然。
所有 `Get-ChildItem | Rename-Item …` 的批次寫法都只是它的特例。
