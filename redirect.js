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

// 显示提示信息并倒数
function showMessage() {
  var overlay = document.getElementById('overlay');
  var countdown = document.getElementById('countdown');
  overlay.style.display = 'block';
  var seconds = 5;
  
  // 每秒更新倒数计时器
  var interval = setInterval(() => {
    seconds--;
    countdown.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
    }
  }, 1000);
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
          window.location.href = 'https://ogtt.tk/';
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
          showMessage();
          // 等待5秒后再跳转
          setTimeout(() => {
            window.location.href = data[urlParam];
          }, 5000);
        } else {
          window.location.href = 'https://ogtt.tk/';
        }
      })
      .catch(error => {
        console.error('Error fetching URL JSON:', error);
      });
  }
}

// 页面加载完毕后立即执行跳转逻辑
window.onload = function() {
  var idParam = getParameterByName('id');
  var urlParam = getParameterByName('url');

  if (idParam) {
    redirectToURLFromId();
  } else if (urlParam) {
    redirectToURLFromUrl();
  }
};
