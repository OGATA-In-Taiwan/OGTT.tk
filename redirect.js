document.addEventListener("DOMContentLoaded", function() {
    // 獲取URL參數
    const urlParams = new URLSearchParams(window.location.search);
    
    // 定義JSON文件路徑
    const urlJsonPath = 'main/ogtt.tk/url.json';
    const idJsonPath = 'main/ogtt.tk/id.json';

    // 處理URL參數
    function handleUrlParam(paramValue) {
        fetch(urlJsonPath)
            .then(response => response.json())
            .then(data => {
                const targetUrl = data[paramValue];
                if (targetUrl) {
                    window.location.href = targetUrl;
                } else {
                    console.error("No matching URL found in JSON.");
                    window.location.href = "https://ogtt.tk";
                }
            })
            .catch(error => console.error(`Error fetching ${urlJsonPath}:`, error));
    }

    // 處理ID參數
    function handleIdParam(paramValue) {
        fetch(idJsonPath)
            .then(response => response.json())
            .then(data => {
                const targetUrl = data[paramValue];
                if (targetUrl) {
                    window.location.href = targetUrl;
                } else {
                    console.error("No matching URL found in JSON.");
                    window.location.href = "https://ogtt.tk";
                }
            })
            .catch(error => console.error(`Error fetching ${idJsonPath}:`, error));
    }

    // 檢查並處理參數
    if (urlParams.has('url')) {
        const paramValue = urlParams.get('url');
        handleUrlParam(paramValue);
    } else if (urlParams.has('id')) {
        const paramValue = urlParams.get('id');
        handleIdParam(paramValue);
    }
});
