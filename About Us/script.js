function toggleDisplay(ele) {
    ele.lastElementChild.classList.toggle("fa-circle-arrow-up")
    ele.lastElementChild.classList.toggle("fa-circle-arrow-down")
    ele.nextElementSibling.classList.toggle('display-none')
}
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