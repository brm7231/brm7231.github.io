fetch('../nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})