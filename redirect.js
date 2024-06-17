function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function showMessage() {
  var overlay = document.getElementById('overlay');
  var countdown = document.getElementById('countdown');
  overlay.style.display = 'block';
  var seconds = 5;
  
  var interval = setInterval(() => {
    seconds--;
    countdown.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}

function redirectToURLFromId() {
  var id = getParameterByName('id');
  if (id) {
    fetch('https://raw.ogtt.tk/redirect/id.json')
      .then(response => response.json())
      .then(data => {
        if (data[id]) {
          window.location.href = data[id];
        } else {
          window.location.href = 'https://www.ogtt.tk';
        }
      })
      .catch(error => {
        console.error('Error fetching ID JSON:', error);
      });
  }
}

function redirectToURLFromUrl() {
  var urlParam = getParameterByName('url');
  if (urlParam) {
    fetch('https://raw.ogtt.tk/redirect/url.json')
      .then(response => response.json())
      .then(data => {
        if (data[urlParam]) {
          showMessage();
          setTimeout(() => {
            window.location.href = data[urlParam];
          }, 5000);
        } else {
          window.location.href = 'https://www.ogtt.tk';
        }
      })
      .catch(error => {
        console.error('Error fetching URL JSON:', error);
      });
  }
}

window.onload = function() {
  var idParam = getParameterByName('id');
  var urlParam = getParameterByName('url');

  if (idParam) {
    redirectToURLFromId();
  } else if (urlParam) {
    redirectToURLFromUrl();
  }
};
