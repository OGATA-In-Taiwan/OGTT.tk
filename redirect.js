// 从URL参数中获取指定的参数值
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// 根据id从id.json中查找对应的网址并跳转
function redirectToURLFromId() {
  var id = getParameterByName('id');
  if (id) {
    fetch('id.json')
      .then(response => response.json())
      .then(data => {
        if (data[id]) {
          window.location.href = data[id];
        } else {
          window.location.href = 'https://www.ogtt.tk/';
        }
      })
      .catch(error => {
        console.error('Error fetching ID JSON:', error);
      });
  }
}

// 根据url从url.json中查找对应的网址并跳转
function redirectToURLFromUrl() {
  var urlParam = getParameterByName('url');
  if (urlParam) {
    fetch('url.json')
      .then(response => response.json())
      .then(data => {
        if (data[urlParam]) {
          // 等待5秒后再跳
          setTimeout(() => {
            window.location.href = data[urlParam];
          }, 5000);
        } else {
          window.location.href = 'https://www.ogtt.tk/';
        }
      })
      .catch(error => {
        console.error('Error fetching URL JSON:', error);
      });
  }
}

// 页面加载完毕后立即执行跳转逻辑
window.onload = function() {
  redirectToURLFromId();
  redirectToURLFromUrl();
};
