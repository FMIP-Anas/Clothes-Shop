//start form of buy process




let form = document.querySelector('form')




let m = fetch('./DataBase.json')
.then(res => res.json())
.then(data => saveAccounts(data))
let accounts
function saveAccounts(data){
    accounts = data.Accounts
}

let done = document.querySelector('body > .done')
let doneParagrahs = document.querySelectorAll('body > .done p')
document.querySelector("body > .done button").onclick = function(){
    done.style.display = "none"
}

form.onsubmit = function (event) {
    event.preventDefault()
    let inputs = document.querySelectorAll('body > form .input')
    let paragraphs = document.querySelectorAll('body > form p')
    let certainAccount
    
    for (let i = 0; i < accounts.length; i++) {
        if(accounts[i]["User Name"]==inputs[0].value){
            certainAccount = accounts[i]
        }
    }
        for (let i = 0; i < accounts.length; i++) {
            for (let i = 0; i < paragraphs.length; i++) {
                paragraphs[i].style.display = "none"
            }
            for (let j = 0; j < inputs.length; j++) {
            let key = inputs[j].id
            if(certainAccount[key] == inputs[j].value){
                inputs[j].classList.add("trueInput")
                inputs[j].style.borderColor = "green"
                inputs[j].style.color = "green"
                inputs[j].nextElementSibling.style.display = "block"
            } else if(accounts[i][key] == inputs[j].value && certainAccount[key] != inputs[j].value){
                inputs[j].style.borderColor = "red"
                inputs[j].style.color = "red"
                inputs[j].nextElementSibling.nextElementSibling.style.display = "block"
            } else if(accounts[i][key] != inputs[j].value){
                inputs[j].style.borderColor = "red"
                inputs[j].style.color = "red"
                inputs[j].parentElement.lastElementChild.style.display = "block"
            }
            }   
        }
        let n = 0
        for (let i = 0; i < inputs.length; i++) {
            if(inputs[i].classList.contains("trueInput")){
                n++
            }
            console.log(n)
        }
        console.log(n)
        if(n==8){
            done.style.display = "block"
            doneParagrahs[0].textContent = `Your Money Before The Deal Was ${certainAccount.Money}`
            certainAccount.Money -= localStorage.getItem('money')
            doneParagrahs[1].textContent = `Your Money Now IS ${certainAccount.Money}`
            console.log(done)
        }
}


//end form of buy process

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