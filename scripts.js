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
    fetch(`${article.code}.json`)
        .then(response => response.json())
        .then(data => {
            const previewContent = data.content.slice(0, 100) + '...';
            articleDiv.innerHTML = `
                <h2><a href="ogtt.tk/article/${article.year}/${article.month}/${article.code}">${article.title}</a></h2>
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

// 調用首頁加載文章函數
loadArticles();
