let buyDiv = document.querySelector('body .buyDiv')
let cartParagraph = document.querySelector('.cart i p')
let detailscartParagraph = document.querySelector('.details i#cart p')

let cards =  document.querySelectorAll('.section .card ')
let cardsParagraph = document.querySelectorAll('.section .card .paragraph')
let cardDescriptions = document.querySelectorAll('.section .card .paragraph > p:first-of-type')
for (let i = 0; i < cardsParagraph.length; i++) {
    cards[i].id = cardDescriptions[i].textContent
}
let money = parseInt(localStorage.getItem('money'))

cartParagraph.textContent = `${money} $`
detailscartParagraph.textContent = `${money} $`

//start removeRmvDiv
function removeRmvDiv(ele) {
    let newMoney = parseInt(localStorage.getItem('money'))-parseInt(ele.previousElementSibling.previousElementSibling.textContent)
    localStorage.setItem('money',newMoney)
    cartParagraph.textContent = `${localStorage.getItem('money')} $`
    detailscartParagraph.textContent = `${localStorage.getItem('money')} $`
    let numberOfProducts = parseInt(ele.lastChild.textContent)
    numberOfProducts-=1
    ele.lastChild.textContent = numberOfProducts
    let s = JSON.parse(localStorage.getItem('bought'))
    for (let i = 0; i < s.length; i++) {
        if(s[i] === ele.previousElementSibling.previousElementSibling.previousElementSibling.textContent){
            s.splice(i,1)
            localStorage.setItem('bought',JSON.stringify(s))
            i = s.length + 1
        }
    }
    if(ele.lastChild.textContent == '0'){
        ele.parentElement.removeChild(ele)
    }
}  
//end removeRmvDiv


//start addRmvDiv
function addRmvDiv() {
    for (let i = 0; i < cards.length; i++) {
        let rmvDiv = document.createElement('div')
        rmvDiv.classList.add("pointer", "pt-5", "pb-5", "fs-20", "d-flex", "gap-5", "justify-center", "align-center")
        let rmvLink = document.createElement('a')
        rmvLink.textContent = 'Remove From Cart'
        rmvLink.classList.add('c-red')
        let rmvIcon = document.createElement('i')
        rmvIcon.classList.add("fa-sharp", "fa-solid", "fa-circle-xmark", "c-red")
        let rmvIterator = document.createElement('p')
        rmvIterator.classList.add('c-red','fs-15')
        rmvDiv.setAttribute('onclick','removeRmvDiv(this)')
        rmvDiv.appendChild(rmvLink)
        rmvDiv.appendChild(rmvIcon)
        rmvDiv.appendChild(rmvIterator)
        let products = 0
        let s = JSON.parse(localStorage.getItem('bought'))
        for (let j = 0; j < s.length; j++) {
            if(cardDescriptions[i].textContent==s[j]){
                products = products + 1
                if (cardsParagraph[i].children.length == 3) {
                    cardsParagraph[i].appendChild(rmvDiv)
                    rmvIterator.textContent = 1
                } else {
                    cardsParagraph[i].lastChild.lastChild.textContent = products
                }
            }
        }
    }

}
window.onload = addRmvDiv()
//end addRmvDiv

function add(ele) {
    let s = JSON.parse(localStorage.getItem('bought'))
    s.push(ele.previousElementSibling.previousElementSibling.textContent)
    localStorage.setItem('bought',JSON.stringify(s))
    let newMoney = parseInt(localStorage.getItem('money'))+parseInt(ele.previousElementSibling.textContent)
    localStorage.setItem('money',newMoney)
    cartParagraph.textContent = `${localStorage.getItem('money')} $`
    detailscartParagraph.textContent = `${localStorage.getItem('money')} $`
    addRmvDiv()
}

function rmvBuyDiv() {
    document.body.removeChild(buyDiv)
}
rmvBuyDiv()

function addBuyDiv() {
    if (localStorage.getItem('money')>0) {
        document.body.prepend(buyDiv)
    }
    let products = buyDiv.children[2].firstElementChild
    products.innerHTML = ''
    let s = JSON.parse(localStorage.getItem('bought'))
    s = new Set(s)
    s = Array.from(s)
    console.log(s)
    for (let i = 0; i < cardDescriptions.length; i++) {
        for (let j = 0; j < s.length; j++) {
            if (cardDescriptions[i].textContent == s[j]) {
                let p = document.createElement('p')
                let number = cardDescriptions[i].nextElementSibling.nextElementSibling.nextElementSibling.lastChild.textContent
                let Items
                if(number > 1){
                    Items = `${number} Items`
                } else{
                    Items = `${number} Item`
                }
                let price = cardDescriptions[i].nextElementSibling.textContent
                let total = `${parseInt(price) * number} $`
                p.textContent = `${cardDescriptions[i].textContent} "${price}" ${Items} / Total: ${total}`
                products.appendChild(p)
            }
    }   }
}


//Start Search

function searchProduct(product) {
    window.open(`shop.html#${product}`,'_self') 
}
let searchForm = document.querySelector(".search-div form")
let search = document.getElementById("search-input")
let suggestionsDiv = document.getElementById("suggestions-div")
searchForm.onsubmit = function (e) {
    e.preventDefault()
    searchProduct(search.value)
}

search.onkeyup = function () {
    suggestionsDiv.innerHTML = ""
    let val = search.value
    let suggestions = []
    for (let i = 0; i < cardDescriptions.length; i++) {
        let x = cardDescriptions[i].textContent
        x = x.substring(0,val.length)
        if(x == val&&val.length>0){
            suggestions.push(cardDescriptions[i].textContent)
        }
    }
    for (let i = 0; i < suggestions.length; i++) {
        let suggestion = document.createElement("p")
        suggestion.textContent = suggestions[i]
        suggestion.setAttribute("onclick","searchProduct(this.textContent)")
        suggestionsDiv.appendChild(suggestion)
    }
}

//End Search



// let s = []
// localStorage.setItem('cardDescriptions',JSON.stringify(cardDescriptions))
// localStorage.setItem('money',0)
function goToForm() {
    window.open(`../Form/form.html`,'_self')  
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