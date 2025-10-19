var showdownScript = document.createElement('script')

// When the script is loaded, set up the markdown viewers
showdownScript.onload = setupMarkdownViewers

///showdownScript.src = 'https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js'
///showdownScript.src = 'https://arkenidar.com/app/lib/html-markdown/showdown.min.js'
showdownScript.src = 'https://arkenidar.github.io/html-markdown/showdown.min.js'

// Insert the script after the current script tag
document.currentScript.insertAdjacentElement('afterend', showdownScript)

function setupMarkdownViewers() {

    // need to wait until showdown is loaded
    if (typeof showdown === 'undefined') {
        setTimeout(setupMarkdownViewers, 50)
        return
    }

    // Now we can use showdown
    var showdownConverter = new showdown.Converter()

    function viewContent(content, node) {
        node.insertAdjacentElement('afterend', document.createElement("div"))
        node.style.display = "none"
        var newNode = node.nextSibling
        newNode.innerHTML = showdownConverter.makeHtml(content)
    }

    for (var node of document.querySelectorAll('.markdown-inline')) {
        node.style.whiteSpace = 'pre'
        var markdown = node.innerText
        node.style.whiteSpace = 'normal'
        viewContent(markdown, node)
    }

    function markdownContentFromURL(url, node) {
        fetch(url)
            .then(response => response.text())
            .then(text => viewContent(text, node))
    }

    for (var node of document.querySelectorAll('.markdown-url'))
        markdownContentFromURL(node.dataset.url, node)
}
