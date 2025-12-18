// GitHub 上傳功能模組

// 上傳到 GitHub Gist
async function uploadToGist(fileName, fileContent, token) {
    try {
        const response = await fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                description: `題庫檔案：${fileName}`,
                public: true,
                files: {
                    [`${fileName}.json`]: {
                        content: fileContent
                    }
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '上傳失敗');
        }

        const result = await response.json();
        return {
            success: true,
            url: result.html_url,
            rawUrl: result.files[`${fileName}.json`].raw_url,
            gistId: result.id
        };
    } catch (error) {
        console.error('上傳到 Gist 失敗:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// 上傳到 GitHub 倉庫（使用 GitHub API）
async function uploadToRepository(fileName, fileContent, config) {
    try {
        const { owner, repo, path, branch } = config.repository;
        const filePath = `${path}${fileName}.json`;
        
        // 先獲取檔案 SHA（如果存在）
        let sha = null;
        try {
            const getResponse = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
                {
                    headers: {
                        'Authorization': `token ${config.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );
            
            if (getResponse.ok) {
                const fileData = await getResponse.json();
                sha = fileData.sha;
            }
        } catch (e) {
            // 檔案不存在，繼續建立新檔案
        }

        // 將檔案內容編碼為 base64
        const content = btoa(unescape(encodeURIComponent(fileContent)));
        
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${config.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    message: `Add quiz library: ${fileName}`,
                    content: content,
                    branch: branch,
                    ...(sha && { sha: sha }) // 如果檔案存在，需要提供 SHA
                })
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '上傳失敗');
        }

        const result = await response.json();
        return {
            success: true,
            url: result.content.html_url,
            downloadUrl: result.content.download_url,
            sha: result.content.sha
        };
    } catch (error) {
        console.error('上傳到倉庫失敗:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// 主要上傳函數
async function uploadToGitHub(fileName, fileContent) {
    // 檢查是否有配置
    if (typeof GITHUB_CONFIG === 'undefined' || !GITHUB_CONFIG.token || GITHUB_CONFIG.token === 'YOUR_GITHUB_TOKEN_HERE') {
        return {
            success: false,
            error: '請先設定 GitHub Token！請參考 config.example.js 建立 config.js 檔案。',
            needConfig: true
        };
    }

    const method = GITHUB_CONFIG.storageMethod || 'gist';
    
    if (method === 'gist') {
        return await uploadToGist(fileName, fileContent, GITHUB_CONFIG.token);
    } else if (method === 'repository') {
        return await uploadToRepository(fileName, fileContent, GITHUB_CONFIG);
    } else {
        return {
            success: false,
            error: '未知的儲存方式！請設定為 "gist" 或 "repository"。'
        };
    }
}

