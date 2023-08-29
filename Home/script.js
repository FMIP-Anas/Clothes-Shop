let icon = document.querySelector("nav .container .links i")
let links = document.querySelector("nav .container ul")
if(window.outerWidth < 768){
    console.log()
    links.classList.add("d-none")
}
icon.onclick = function () {
    links.classList.toggle("display-flex")
    links.classList.toggle("d-none")
}


function goToProducts(category) {
    window.open(`../Shop/Shop.html#${category}`,'_self')  
}