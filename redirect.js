// Parse URL parameters
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to create an iframe and inject script
function createIframeAndInjectScript(targetUrl, scriptContent) {
    const iframe = document.createElement('iframe');
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.src = targetUrl;

    iframe.onload = () => {
        const script = document.createElement('script');
        script.textContent = scriptContent;
        iframe.contentWindow.document.body.appendChild(script);
    };

    document.body.innerHTML = ""; // Clear current content
    document.body.appendChild(iframe);
}

// Function to fetch and redirect based on the parameter
async function redirect() {
    const urlParam = getParameterByName('url');
    const idParam = getParameterByName('id');

    if (urlParam) {
        try {
            const response = await fetch('main/ogtt.tk/url.json');
            const data = await response.json();
            if (data[urlParam]) {
                // Redirect and inject script via iframe
                createIframeAndInjectScript(data[urlParam].url, data[urlParam].script);
            } else {
                alert('URL parameter not found in the JSON file.');
            }
        } catch (error) {
            console.error('Error fetching URL JSON file:', error);
        }
    } else if (idParam) {
        try {
            const response = await fetch('main/ogtt.tk/id.json');
            const data = await response.json();
            if (data[idParam]) {
                // Redirect and inject script via iframe
                createIframeAndInjectScript(data[idParam].url, data[idParam].script);
            } else {
                alert('ID parameter not found in the JSON file.');
            }
        } catch (error) {
            console.error('Error fetching ID JSON file:', error);
        }
    } else {
        alert('No valid parameters provided in the URL.');
    }
}

// Execute the redirect function
redirect();
