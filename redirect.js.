function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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

function redirectToURLFromUrl() {
  var urlParam = getParameterByName('url');
  if (urlParam) {
    fetch('url.json')
      .then(response => response.json())
      .then(data => {
        if (data[urlParam]) {
          window.location.href = data[urlParam];
        } else {
          window.location.href = 'https://www.ogtt.tk/';
        }
      })
      .catch(error => {
        console.error('Error fetching URL JSON:', error);
      });
  }
}

window.onload = function() {
  redirectToURLFromId();
  redirectToURLFromUrl();
};
