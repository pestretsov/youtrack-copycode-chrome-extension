function copyStringToClipBoard(anchorElement, str) {
    const dummyTextArea = document.createElement('textarea');
    dummyTextArea.innerHTML = str;
    const parent = anchorElement;
    parent.appendChild(dummyTextArea);
    dummyTextArea.select();
    document.execCommand('copy');
    parent.removeChild(dummyTextArea);
}

const YT_COPY_CODE_SIGN = "yt-copy-code";
const COPY_ICON_HTML = '<tooltip title="Copy code to clipboard"><yt-icon srcset="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBkPSJNMTEgNVYxSDF2MTBoNHY0aDEwVjV6TTIuNCA5LjZWMi40aDcuMnY3LjJ6bTExLjIgNEg2LjRWMTFIMTFWNi40aDIuNnoiPjwvcGF0aD48L3N2Zz4=" class="yt-icon ring-icon" style="font-size: 16px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11 5V1H1v10h4v4h10V5zM2.4 9.6V2.4h7.2v7.2zm11.2 4H6.4V11H11V6.4h2.6z"></path></svg></yt-icon></tooltip>';

function initCopyCode() {
    const elementsByTagName = document.getElementsByTagName("code");
    for (const codeFragment of elementsByTagName) {
        if (!codeFragment.classList.contains("inline-code") && !codeFragment.classList.contains(YT_COPY_CODE_SIGN)) {
            const copyCodeButton = document.createElement('a');
            copyCodeButton.innerHTML = COPY_ICON_HTML
            copyCodeButton.addEventListener("click", () => copyStringToClipBoard(codeFragment, codeFragment.textContent));
            codeFragment.parentNode.parentNode.insertBefore(copyCodeButton, codeFragment.parentNode);
            codeFragment.classList.add(YT_COPY_CODE_SIGN);
        }
    }
}

function addObservers() {
    const targetNode = document.getElementsByTagName('body')[0];
    const config = { attributes: true, childList: true, subtree: true };

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                initCopyCode();
                observer.disconnect();
                break;
            }
        }
    });
    observer.observe(targetNode, config);
}

setInterval(addObservers, 1000);