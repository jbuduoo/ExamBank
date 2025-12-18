// 題庫檔案列表（從 quiz-library 資料夾）
const quizFiles = [
    'quiz-library/113年_-_113-1_中國工業工程學會_工業工程師等相關證照考試：人工智慧.json',
    'quiz-library/114年_-_iPAS_AI_應用規劃師能力鑑定考試樣題(初級).json',
    'quiz-library/114年_-_iPAS_AI應用規劃師備考題目整理題庫：升級引擎~線上課程(單元一~七).json',
    'quiz-library/114年_-_iPAS_AI應用規劃師初級能力(科目一)_151-181.json',
    'quiz-library/114年_-_iPAS_AI應用規劃師初級能力(科目二)_1-50.json',
    'quiz-library/114年_-_iPAS_AI應用規劃師初級能力(科目二)_101-156.json',
    'quiz-library/114年_-_iPAS_AI應用規劃師初級能力(科目二)_51-100.json',
    'quiz-library/114年_-_iPAS_AI應用規劃師初級能力鑑定_科目一：人工智慧基礎概論.json',
    'quiz-library/114年_-_iPAS_AI應用規劃師能力鑑定初級考試試題#127151.json',
    'quiz-library/114年_-_iPAS_經濟部產業人才初級能力鑑定_AI應用規劃師科目2.json',
    'quiz-library/114年_-_iPAS_經濟部產業人才能力初級鑑定_AI應用規劃師：人工智慧基礎概論(模擬考題1-4).json',
    'quiz-library/114年_-_iPAS_經濟部產業人才能力初級鑑定_AI應用規劃師科目1：人工智慧基礎概論(模擬考題1-1).json',
    'quiz-library/114年_-_iPAS_經濟部產業人才能力初級鑑定_AI應用規劃師科目1：人工智慧基礎概論(模擬考題1-2).json',
    'quiz-library/114年_-_iPAS_經濟部產業人才能力初級鑑定_AI應用規劃師科目一：人工智慧基礎概論(模擬考題1-3).json',
    'quiz-library/114年_-_iPAS◆AI應用規劃師◆初級-科目1-L1101#130994.json',
    'quiz-library/114年_-_人工智慧與大數據概念測驗#127045-阿摩線上測驗.json',
    'quiz-library/114年-iPAS_AI應用規劃師初級能力(科目一)_101-150.json',
    'quiz-library/114年-中國工業工程學會_工業工程師等相關證照考試：人工智慧11401.json',
    'quiz-library/114年iPAS_AI應用規劃師初級能力(科目一).json',
    'quiz-library/AZ900_20251216.json',
    'quiz-library/IPAS_01_AI_126932-阿摩線上測驗.json',
    'quiz-library/IPAS_01_AI_126942-阿摩線上測驗.json',
    'quiz-library/IPAS_01初級_L11 人工智慧基礎概論_11409.json',
    'quiz-library/IPAS_01初級_L11人 工智慧基礎概論_11411.json',
    'quiz-library/IPAS_01初級_L12生成式AI應用與規劃_11409.json',
    'quiz-library/IPAS_01初級_L12生成式AI應用與規劃_11411.json',
    'quiz-library/IPAS_02中級_L21人工智慧技術應用與規劃_11409.json',
    'quiz-library/IPAS_02中級_L21人工智慧技術應用與規劃_11411.json',
    'quiz-library/IPAS_02中級_L23機器學習技術與應用_11409.json',
    'quiz-library/IPAS_02中級_L23機器學習技術與應用_11411.json',
    'quiz-library/spring boot 基礎題練習.json',
    'quiz-library/伊麗沙白公司_面試題114年.json',
    'quiz-library/面試常用規則.json'
];

// 題庫資料陣列
let decksData = [];

// 載入單個題庫檔案
async function loadQuizFile(filePath) {
    try {
        // 對檔案路徑進行 URL 編碼，處理空格和特殊字元
        const encodedPath = filePath.split('/').map(part => encodeURIComponent(part)).join('/');
        const response = await fetch(encodedPath);
        if (!response.ok) {
            console.error(`無法載入 ${filePath}，HTTP 狀態碼: ${response.status}`);
            throw new Error(`無法載入 ${filePath}`);
        }
        const data = await response.json();
        
        // 從檔案路徑提取檔名作為標題
        const fileName = filePath.split('/').pop().replace('.json', '');
        
        // 必須是直接陣列格式
        if (!Array.isArray(data)) {
            console.error(`檔案格式錯誤：${filePath} 必須是陣列格式！`);
            throw new Error(`檔案格式錯誤：必須是陣列格式！`);
        }
        const questions = data;
        
        // 計算題目數量
        const questionCount = questions.length;
        
        // 計算圖片數量（檢查題目中是否有圖片）
        let imageCount = 0;
        if (questions.length > 0) {
            imageCount = questions.filter(q => q.diagram || q.image).length;
        }
        
        // 使用當前日期作為修改日期
        const modifiedDate = new Date().toISOString().split('T')[0];
        
        // 計算評分（基於題目數量，範圍 0-100）
        // 假設題目越多評分越高，最多 100 題 = 100%
        const maxQuestions = 600; // 設定最大題目數作為基準
        const ratingPercent = Math.min(100, Math.round((questionCount / maxQuestions) * 100));
        
        // 生成隨機評分數字（基於題目數量）
        const rating = Math.max(10, Math.min(30, Math.round(questionCount / 20)));
        
        // 負評百分比（隨機生成，但保持較低）
        const negativePercent = Math.random() < 0.3 ? Math.round(Math.random() * 5) : 0;
        
        return {
            title: fileName,
            filePath: filePath,
            rating: rating,
            ratingPercent: ratingPercent,
            negativePercent: negativePercent,
            modified: modifiedDate,
            notes: questionCount,
            images: imageCount,
            source: fileName,
            isUploaded: false // 標記是否為上傳的檔案
        };
    } catch (error) {
        console.error(`載入 ${filePath} 時發生錯誤:`, error);
        return null;
    }
}

// 載入所有題庫
async function loadAllQuizzes() {
    const loadingRow = document.querySelector('#decksTableBody tr');
    if (loadingRow) {
        loadingRow.innerHTML = '<td colspan="5" style="text-align: center; padding: 20px;"><div class="loading-spinner">載入題庫中...</div></td>';
    }
    
    try {
        const results = await Promise.all(quizFiles.map(file => loadQuizFile(file)));
        const successfulDecks = results.filter(deck => deck !== null);
        const failedCount = results.length - successfulDecks.length;
        
        if (failedCount > 0) {
            console.warn(`有 ${failedCount} 個檔案載入失敗，請檢查瀏覽器控制台`);
        }
        
        decksData = successfulDecks;
        
        // 載入本地儲存的上傳檔案
        loadUploadedQuizzes();
        
        // 按修改日期排序（最新的在前）
        decksData.sort((a, b) => {
            return new Date(b.modified) - new Date(a.modified);
        });
        
        renderDecks(decksData);
    } catch (error) {
        console.error('載入題庫時發生錯誤:', error);
        const tbody = document.getElementById('decksTableBody');
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #ef4444;">載入題庫失敗，請重新整理頁面。</td></tr>';
    }
}

// 載入本地儲存的上傳檔案
function loadUploadedQuizzes() {
    try {
        const uploadedQuizzes = localStorage.getItem('uploadedQuizzes');
        if (uploadedQuizzes) {
            const parsed = JSON.parse(uploadedQuizzes);
            parsed.forEach(quiz => {
                // 檢查是否已存在（避免重複）
                const exists = decksData.some(d => d.title === quiz.title && d.isUploaded);
                if (!exists) {
                    decksData.push(quiz);
                }
            });
        }
    } catch (error) {
        console.error('載入上傳檔案時發生錯誤:', error);
    }
}

// 儲存上傳的題庫到本地儲存
function saveUploadedQuiz(quizData) {
    try {
        let uploadedQuizzes = localStorage.getItem('uploadedQuizzes');
        if (!uploadedQuizzes) {
            uploadedQuizzes = '[]';
        }
        const parsed = JSON.parse(uploadedQuizzes);
        parsed.push(quizData);
        localStorage.setItem('uploadedQuizzes', JSON.stringify(parsed));
    } catch (error) {
        console.error('儲存上傳檔案時發生錯誤:', error);
    }
}

// 處理檔案上傳
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.json')) {
        alert('請上傳 JSON 格式的題庫檔案！');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // 驗證檔案格式：必須是直接陣列格式
            if (!Array.isArray(data)) {
                alert('檔案格式錯誤：必須是陣列格式！\n\n正確格式：\n[{ "Id": "1", "Q": "題目內容", "A": "選項A", "B": "選項B", "C": "選項C", "D": "選項D", "Ans": "A", "Exp": "詳解" }]');
                return;
            }
            
            const questions = data;
            
            if (questions.length === 0) {
                alert('檔案格式錯誤：題目陣列為空！');
                return;
            }
            
            // 驗證題目格式
            if (!questions[0].Q || !questions[0].A) {
                alert('檔案格式錯誤：題目格式不正確！');
                return;
            }
            
            // 處理上傳的檔案
            const fileName = file.name.replace('.json', '');
            const questionCount = questions.length;
            
            // 計算圖片數量
            let imageCount = 0;
            if (questions.length > 0) {
                imageCount = questions.filter(q => q.diagram || q.image).length;
            }
            
            // 使用當前日期作為修改日期
            const modifiedDate = new Date().toISOString().split('T')[0];
            
            // 計算評分
            const maxQuestions = 600;
            const ratingPercent = Math.min(100, Math.round((questionCount / maxQuestions) * 100));
            const rating = Math.max(10, Math.min(30, Math.round(questionCount / 20)));
            const negativePercent = Math.random() < 0.3 ? Math.round(Math.random() * 5) : 0;
            
            // 建立題庫資料物件
            const quizData = {
                title: fileName,
                filePath: null, // 上傳的檔案沒有檔案路徑
                rating: rating,
                ratingPercent: ratingPercent,
                negativePercent: negativePercent,
                modified: modifiedDate,
                notes: questionCount,
                images: imageCount,
                source: data.source || fileName,
                isUploaded: true,
                fileContent: e.target.result // 儲存檔案內容以便下載
            };
            
            // 先儲存到本地儲存（備份）
            saveUploadedQuiz(quizData);
            
            // 嘗試上傳到 GitHub（如果已設定）
            if (typeof uploadToGitHub !== 'undefined') {
                const uploadBtn = document.querySelector('.upload-btn');
                const originalText = uploadBtn.textContent.trim();
                uploadBtn.textContent = '上傳中...';
                uploadBtn.disabled = true;
                
                try {
                    const uploadResult = await uploadToGitHub(fileName, e.target.result);
                    
                    if (uploadResult.success) {
                        // 更新檔案路徑為 GitHub URL
                        if (uploadResult.downloadUrl) {
                            quizData.filePath = uploadResult.downloadUrl;
                            quizData.githubUrl = uploadResult.url;
                            quizData.isUploaded = false; // 標記為已上傳到 GitHub
                        } else if (uploadResult.rawUrl) {
                            quizData.filePath = uploadResult.rawUrl;
                            quizData.githubUrl = uploadResult.url;
                            quizData.isUploaded = false;
                        }
                        
                        // 更新本地儲存
                        saveUploadedQuiz(quizData);
                        
                        alert(`題庫「${fileName}」已成功上傳到 GitHub！\n題目數：${questionCount}\n${uploadResult.url ? `查看：${uploadResult.url}` : ''}`);
                    } else {
                        if (uploadResult.needConfig) {
                            console.warn('GitHub 上傳未設定，使用本地儲存');
                            alert(`題庫「${fileName}」已儲存到本地！\n題目數：${questionCount}\n\n提示：如需上傳到 GitHub，請設定 config.js`);
                        } else {
                            console.warn('GitHub 上傳失敗，使用本地儲存:', uploadResult.error);
                            alert(`題庫「${fileName}」已儲存到本地！\n題目數：${questionCount}\n\nGitHub 上傳失敗：${uploadResult.error}`);
                        }
                    }
                } catch (error) {
                    console.error('上傳過程發生錯誤:', error);
                    alert(`題庫「${fileName}」已儲存到本地！\n題目數：${questionCount}\n\nGitHub 上傳時發生錯誤`);
                } finally {
                    uploadBtn.textContent = originalText;
                    uploadBtn.disabled = false;
                }
            } else {
                // 沒有 GitHub 上傳功能，只使用本地儲存
                alert(`題庫「${fileName}」已儲存到本地！\n題目數：${questionCount}\n\n提示：如需上傳到 GitHub，請設定 config.js`);
            }
            
            // 添加到題庫列表
            decksData.push(quizData);
            
            // 重新排序和渲染
            decksData.sort((a, b) => {
                return new Date(b.modified) - new Date(a.modified);
            });
            
            renderDecks(decksData);
            
            // 重置檔案輸入
            event.target.value = '';
            
        } catch (error) {
            console.error('解析檔案時發生錯誤:', error);
            alert('檔案格式錯誤：無法解析 JSON 檔案！');
        }
    };
    
    reader.onerror = function() {
        alert('讀取檔案時發生錯誤！');
    };
    
    reader.readAsText(file);
}

// 渲染題庫表格
function renderDecks(decks) {
    const tbody = document.getElementById('decksTableBody');
    tbody.innerHTML = '';
    
    if (decks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">沒有找到題庫。</td></tr>';
        return;
    }
    
    decks.forEach(deck => {
        const row = document.createElement('tr');
        
        const negativeWidth = deck.negativePercent || 0;
        const positiveWidth = Math.max(0, deck.ratingPercent - negativeWidth);
        
        // 建立標題單元格
        const titleCell = document.createElement('td');
        titleCell.className = 'title-cell';
        
        if (deck.isUploaded) {
            // 上傳的檔案：顯示標題和標籤
            const titleSpan = document.createElement('span');
            titleSpan.className = 'deck-title';
            titleSpan.textContent = deck.title;
            titleCell.appendChild(titleSpan);
            
            const badge = document.createElement('span');
            badge.className = 'uploaded-badge';
            badge.textContent = '已上傳';
            titleCell.appendChild(badge);
            
            // 下載按鈕
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn';
            downloadBtn.textContent = '⬇';
            downloadBtn.title = '下載';
            downloadBtn.onclick = () => downloadUploadedQuiz(deck.title);
            titleCell.appendChild(downloadBtn);
        } else {
            // 原始檔案：可點擊下載
            const link = document.createElement('a');
            link.href = deck.filePath || '#';
            link.className = 'deck-title';
            link.textContent = deck.title;
            if (deck.filePath) {
                link.setAttribute('download', '');
            }
            titleCell.appendChild(link);
        }
        
        // 建立評分單元格
        const ratingCell = document.createElement('td');
        const ratingBar = document.createElement('div');
        ratingBar.className = 'rating-bar';
        
        const ratingFill = document.createElement('div');
        ratingFill.className = 'rating-fill';
        ratingFill.style.width = `${positiveWidth}%`;
        ratingBar.appendChild(ratingFill);
        
        if (negativeWidth > 0) {
            const ratingNegative = document.createElement('div');
            ratingNegative.className = 'rating-negative';
            ratingNegative.style.width = `${negativeWidth}%`;
            ratingBar.appendChild(ratingNegative);
        }
        
        const ratingNumber = document.createElement('span');
        ratingNumber.className = 'rating-number';
        ratingNumber.textContent = deck.rating;
        
        ratingCell.appendChild(ratingBar);
        ratingCell.appendChild(ratingNumber);
        
        // 建立其他單元格
        const modifiedCell = document.createElement('td');
        modifiedCell.textContent = deck.modified;
        
        const notesCell = document.createElement('td');
        notesCell.textContent = deck.notes;
        
        const imagesCell = document.createElement('td');
        imagesCell.textContent = deck.images;
        
        // 組裝行
        row.appendChild(titleCell);
        row.appendChild(ratingCell);
        row.appendChild(modifiedCell);
        row.appendChild(notesCell);
        row.appendChild(imagesCell);
        
        tbody.appendChild(row);
    });
}

// 下載上傳的題庫檔案
function downloadUploadedQuiz(title) {
    try {
        // 從 localStorage 中找到對應的題庫
        const uploadedQuizzes = localStorage.getItem('uploadedQuizzes');
        if (!uploadedQuizzes) {
            alert('找不到該題庫檔案！');
            return;
        }
        
        const parsed = JSON.parse(uploadedQuizzes);
        const quiz = parsed.find(q => q.title === title);
        
        if (!quiz || !quiz.fileContent) {
            alert('找不到該題庫檔案內容！');
            return;
        }
        
        // 建立 Blob 並下載
        const blob = new Blob([quiz.fileContent], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('下載檔案時發生錯誤:', error);
        alert('下載檔案時發生錯誤！');
    }
}

// 搜尋功能
function searchDecks() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderDecks(decksData);
        return;
    }
    
    const filteredDecks = decksData.filter(deck => 
        deck.title.toLowerCase().includes(searchTerm) ||
        (deck.source && deck.source.toLowerCase().includes(searchTerm))
    );
    
    renderDecks(filteredDecks);
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 載入所有題庫
    loadAllQuizzes();
    
    // 搜尋輸入框 Enter 鍵事件
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchDecks();
        }
    });
    
    // 搜尋輸入框即時搜尋（可選）
    searchInput.addEventListener('input', function() {
        // 可以選擇即時搜尋或只在按 Enter 時搜尋
        // searchDecks();
    });
    
    // 檔案上傳事件
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
        fileUpload.addEventListener('change', handleFileUpload);
    }
});
