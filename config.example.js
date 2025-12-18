// GitHub 配置範例檔案
// 複製此檔案為 config.js 並填入您的 GitHub Personal Access Token

const GITHUB_CONFIG = {
    // GitHub Personal Access Token
    // 建立方式：https://github.com/settings/tokens
    // 需要權限：gist (用於 Gists API) 或 repo (用於直接提交到倉庫)
    token: 'YOUR_GITHUB_TOKEN_HERE',
    
    // 儲存方式：'gist' 或 'repository'
    // 'gist': 使用 GitHub Gists API（推薦，簡單）
    // 'repository': 直接提交到 GitHub 倉庫（需要 repo 權限）
    storageMethod: 'gist',
    
    // 如果使用 repository 方式，需要設定以下資訊
    repository: {
        owner: 'jbuduoo',  // GitHub 用戶名或組織名
        repo: 'ExamBank',   // 倉庫名稱
        path: 'quiz-library/uploaded/',  // 儲存路徑
        branch: 'main'      // 分支名稱
    }
};

