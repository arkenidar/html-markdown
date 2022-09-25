var showdownScript=document.createElement('script')
showdownScript.src='https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js'

var scriptNode=document.querySelector('script[data-name=markdown]')
scriptNode.insertAdjacentElement('afterend',showdownScript)

onload=setupMarkdownViewers

function setupMarkdownViewers(){

	var showdownConverter = new showdown.Converter()

	function viewContent(content,node){
		node.innerHTML=showdownConverter.makeHtml(content)
	}

	for(var node of document.querySelectorAll('.markdown-inline')){
		node.style.whiteSpace='pre'
		var markdown=node.innerText
		node.style.whiteSpace='normal'
		viewContent(markdown,node)
	}

	function markdownContentFromURL(url,node){
		fetch(url)
		.then(response=>response.text())
		.then(text=>viewContent(text,node))
	}
	
	for(var node of document.querySelectorAll('.markdown-url'))
		markdownContentFromURL(node.dataset.url,node)
}