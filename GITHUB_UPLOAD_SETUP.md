# GitHub 上傳功能設定指南

## 概述

ExamBank 支援將上傳的題庫檔案自動儲存到 GitHub，方便版本控制和分享。

## 儲存方式

### 方式 1：GitHub Gists（推薦）

**優點：**
- ✅ 設定簡單
- ✅ 不需要倉庫寫入權限
- ✅ 自動建立公開連結
- ✅ 適合小檔案（< 1MB）

**缺點：**
- ❌ 單檔限制 1MB
- ❌ 總容量限制 1GB

### 方式 2：直接提交到 GitHub 倉庫

**優點：**
- ✅ 直接存入倉庫
- ✅ 可版本控制
- ✅ 無檔案大小限制（GitHub 限制 100MB）

**缺點：**
- ❌ 需要倉庫寫入權限
- ❌ 需要處理 commit 和分支

## 設定步驟

### 1. 建立 GitHub Personal Access Token

1. 前往 https://github.com/settings/tokens
2. 點擊 "Generate new token" → "Generate new token (classic)"
3. 填寫 Token 名稱（例如：ExamBank Upload）
4. 選擇權限：
   - **Gists 方式**：勾選 `gist`
   - **倉庫方式**：勾選 `repo`
5. 點擊 "Generate token"
6. **複製 Token**（只會顯示一次！）

### 2. 建立配置檔案

1. 複製 `config.example.js` 為 `config.js`：
   ```bash
   cp config.example.js config.js
   ```

2. 編輯 `config.js`，填入您的 Token：

   **Gists 方式：**
   ```javascript
   const GITHUB_CONFIG = {
       token: 'ghp_your_token_here',
       storageMethod: 'gist'
   };
   ```

   **倉庫方式：**
   ```javascript
   const GITHUB_CONFIG = {
       token: 'ghp_your_token_here',
       storageMethod: 'repository',
       repository: {
           owner: 'jbuduoo',
           repo: 'ExamBank',
           path: 'quiz-library/uploaded/',
           branch: 'main'
       }
   };
   ```

### 3. 測試上傳

1. 開啟網站
2. 點擊「上傳題庫」
3. 選擇一個 JSON 題庫檔案
4. 如果設定正確，檔案會自動上傳到 GitHub

## 安全注意事項

⚠️ **重要：**
- `config.js` 已加入 `.gitignore`，不會被提交到 Git
- **不要**將包含 Token 的 `config.js` 提交到公開倉庫
- 如果 Token 洩露，請立即到 GitHub 設定中撤銷該 Token

## 故障排除

### 問題：上傳失敗，顯示 "請先設定 GitHub Token"

**解決方案：**
- 確認已建立 `config.js` 檔案
- 確認 Token 已正確填入
- 確認 `index.html` 中有引入 `config.js`

### 問題：上傳失敗，顯示 "Bad credentials"

**解決方案：**
- Token 可能已過期或被撤銷
- 重新建立 Token 並更新 `config.js`

### 問題：上傳失敗，顯示 "Not Found"（倉庫方式）

**解決方案：**
- 確認倉庫名稱和擁有者正確
- 確認 Token 有 `repo` 權限
- 確認分支名稱正確（main 或 master）

### 問題：上傳失敗，顯示 "File too large"（Gists 方式）

**解決方案：**
- Gists 單檔限制 1MB
- 改用倉庫方式上傳
- 或分割檔案

## 檔案儲存位置

### Gists 方式
- 檔案儲存在：`https://gist.github.com/[username]/[gist-id]`
- 原始檔案：`https://gist.githubusercontent.com/[username]/[gist-id]/raw/[filename]`

### 倉庫方式
- 檔案儲存在：`quiz-library/uploaded/[filename].json`
- 可直接在 GitHub 倉庫中查看和下載

## 本地儲存備份

即使上傳到 GitHub，檔案仍會儲存在瀏覽器的 localStorage 中作為備份。如果 GitHub 上傳失敗，系統會自動使用本地儲存。

