/* scripts.js */

document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function createArticlePreview(article) {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article-preview');
    fetch(`articles/json/${article.code}.json`)
        .then(response => response.json())
        .then(data => {
            const previewContent = data.content.slice(0, 100) + '...';
            articleDiv.innerHTML = `
                <h2><a href="articles/${article.year}/${article.month}/${article.code}.html">${article.title}</a></h2>
                <p>${previewContent}</p>
                <small>${data.author} - ${data.last_updated}</small>
            `;
        });
    return articleDiv;
}

function loadArticles() {
    fetch('articles.json')
        .then(response => response.json())
        .then(data => {
            const mainContent = document.getElementById('main-content');
            data.articles.forEach(article => {
                mainContent.appendChild(createArticlePreview(article));
            });
        });
}

// 隱藏首頁作者介紹欄位
if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    document.getElementById('author-info').style.display = 'none';
}

// 調用首頁加載文章函數
loadArticles();
