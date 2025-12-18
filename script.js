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
    'quiz-library/IPAS_02中級_L23機器學習技術與應用_11411.json'
];

// 題庫資料陣列
let decksData = [];

// 載入單個題庫檔案
async function loadQuizFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`無法載入 ${filePath}`);
        }
        const data = await response.json();
        
        // 從檔案路徑提取檔名作為標題
        const fileName = filePath.split('/').pop().replace('.json', '');
        
        // 計算題目數量
        const questionCount = data.questions ? data.questions.length : 0;
        
        // 計算圖片數量（檢查題目中是否有圖片）
        let imageCount = 0;
        if (data.questions) {
            imageCount = data.questions.filter(q => q.diagram || q.image).length;
        }
        
        // 使用 importDate 或檔案修改時間作為修改日期
        const modifiedDate = data.importDate || new Date().toISOString().split('T')[0];
        
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
            audio: 0, // JSON 檔案中沒有音訊
            images: imageCount,
            source: data.source || fileName
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
        loadingRow.innerHTML = '<td colspan="6" style="text-align: center; padding: 40px;"><div class="loading-spinner">載入題庫中...</div></td>';
    }
    
    try {
        const results = await Promise.all(quizFiles.map(file => loadQuizFile(file)));
        decksData = results.filter(deck => deck !== null);
        
        // 按修改日期排序（最新的在前）
        decksData.sort((a, b) => {
            return new Date(b.modified) - new Date(a.modified);
        });
        
        renderDecks(decksData);
    } catch (error) {
        console.error('載入題庫時發生錯誤:', error);
        const tbody = document.getElementById('decksTableBody');
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #ef4444;">載入題庫失敗，請重新整理頁面。</td></tr>';
    }
}

// 渲染題庫表格
function renderDecks(decks) {
    const tbody = document.getElementById('decksTableBody');
    tbody.innerHTML = '';
    
    if (decks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;">沒有找到題庫。</td></tr>';
        return;
    }
    
    decks.forEach(deck => {
        const row = document.createElement('tr');
        
        const negativeWidth = deck.negativePercent || 0;
        const positiveWidth = Math.max(0, deck.ratingPercent - negativeWidth);
        
        // 建立下載連結
        const downloadLink = deck.filePath;
        
        row.innerHTML = `
            <td class="title-cell">
                <a href="${downloadLink}" class="deck-title" download>${deck.title}</a>
            </td>
            <td>
                <div class="rating-bar">
                    <div class="rating-fill" style="width: ${positiveWidth}%;"></div>
                    ${negativeWidth > 0 ? `<div class="rating-negative" style="width: ${negativeWidth}%;"></div>` : ''}
                </div>
                <span class="rating-number">${deck.rating}</span>
            </td>
            <td>${deck.modified}</td>
            <td>${deck.notes}</td>
            <td>${deck.audio}</td>
            <td>${deck.images}</td>
        `;
        
        tbody.appendChild(row);
    });
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
    
    // 分享按鈕點擊事件
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            alert('分享題庫功能即將推出！');
        });
    }
});
