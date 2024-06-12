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

// 设置localStorage项
function setLocalStorageItems(items) {
  for (const key in items) {
    if (items.hasOwnProperty(key)) {
      localStorage.setItem(key, items[key]);
    }
  }
}

// 根据id从id.json中查找对应的网址并跳转
function redirectToURLFromId() {
  var id = getParameterByName('id');
  if (id) {
    fetch('id.json')
      .then(response => response.json())
      .then(data => {
        if (data[id]) {
          setLocalStorageItems(data[id].localStorage); // 设置localStorage项
          window.location.href = data[id].url;
        } else {
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
    fetch('url.json')
      .then(response => response.json())
      .then(data => {
        if (data[urlParam]) {
          setLocalStorageItems(data[urlParam].localStorage); // 设置localStorage项
          window.location.href = data[urlParam].url;
        } else {
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
