fetch('../preloader')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_preloader");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
    document.querySelector("head").appendChild("<script src='/preloader/script.js'></script>")
    document.querySelector("head").appendChild("<style src='/preloader/style.css'></style>")
})