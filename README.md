# ExamBank - 題庫系統

一個現代化的靜態網頁專案，使用 HTML、CSS 和 JavaScript 建立。可以瀏覽和下載 `quiz-library` 資料夾中的題庫檔案。

## 功能特色

- 📚 題庫瀏覽與下載
- 🔍 題庫搜尋功能
- 📊 題庫資訊顯示（題目數、修改日期、評分等）
- 📱 響應式設計
- ⭐ 動態載入題庫資料

## 如何部署到 GitHub Pages

1. 將所有檔案推送到 GitHub 倉庫：
   ```bash
   git add .
   git commit -m "Initial commit: Add static website"
   git push origin main
   ```

2. 在 GitHub 倉庫設定中啟用 GitHub Pages：
   - 前往倉庫的 **Settings** 頁面
   - 在左側選單中找到 **Pages**
   - 在 **Source** 下拉選單中選擇 **Deploy from a branch**
   - 選擇 **main** 分支和 **/ (root)** 資料夾
   - 點擊 **Save**

3. 等待幾分鐘後，您的網站將在以下網址可用：
   `https://jbuduoo.github.io/ExamBank/`

## 本地開發

**重要：** 由於瀏覽器的 CORS 安全限制，必須使用本地伺服器才能載入題庫 JSON 檔案。

### 方法 1：使用 Python HTTP 伺服器
```bash
python -m http.server 8000
```
然後在瀏覽器中訪問 `http://localhost:8000`

### 方法 2：使用 Node.js http-server
```bash
npx http-server -p 8000
```
然後在瀏覽器中訪問 `http://localhost:8000`

### 方法 3：使用 VS Code Live Server
如果您使用 VS Code，可以安裝 "Live Server" 擴充功能，然後右鍵點擊 `index.html` 選擇 "Open with Live Server"

## 檔案結構

```
ExamBank/
├── index.html          # 主頁面
├── styles.css          # 樣式表
├── script.js           # JavaScript 功能
├── quiz-library/       # 題庫資料夾
│   ├── *.json         # 題庫 JSON 檔案
│   └── README.md      # 題庫說明文件
├── .gitignore         # Git 忽略檔案
└── README.md          # 說明文件
```

## 題庫格式

題庫檔案為 JSON 格式，結構如下：
```json
{
  "source": "題庫來源名稱",
  "importDate": "2025-01-01",
  "questions": [
    {
      "Id": "1",
      "Q": "題目內容",
      "A": "選項 A",
      "B": "選項 B",
      "C": "選項 C",
      "D": "選項 D",
      "Ans": "A",
      "Exp": "詳解內容"
    }
  ]
}
```

## 技術棧

- HTML5
- CSS3 (包含動畫和響應式設計)
- Vanilla JavaScript

## 授權

MIT License

