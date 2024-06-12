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
    // 发送请求到服务器或从本地JSON文件中获取id对应的网址
    fetch('id.json')
      .then(response => response.json())
      .then(data => {
        if (data[id]) {
          window.location.href = data[id];
        } else {
          // 如果没有找到对应的网址，可以跳转到一个默认页面
          window.location.href = 'default.html';
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
    // 发送请求到服务器或从本地JSON文件中获取url对应的网址
    fetch('url.json')
      .then(response => response.json())
      .then(data => {
        if (data[urlParam]) {
          window.location.href = data[urlParam];
        } else {
          // 如果没有找到对应的网址，可以跳转到一个默认页面
          window.location.href = 'default.html';
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
