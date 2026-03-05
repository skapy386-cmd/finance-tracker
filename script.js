let transactions = JSON.parse(localStorage.getItem("transactions")) || []
let categories = JSON.parse(localStorage.getItem("categories")) || ["Food","Transport","Other"]

const categorySelect = document.getElementById("category")
const list = document.getElementById("list")

function save(){
localStorage.setItem("transactions", JSON.stringify(transactions))
localStorage.setItem("categories", JSON.stringify(categories))
}

function renderCategories(){
categorySelect.innerHTML = ""

categories.forEach(cat=>{
const option = document.createElement("option")
option.value = cat
option.textContent = cat
categorySelect.appendChild(option)
})
}

function renderTransactions(){
list.innerHTML = ""

transactions.forEach(t=>{
const li = document.createElement("li")
li.textContent = `${t.date} | ${t.category} | ${t.amount}`
list.appendChild(li)
})
}

function addTransaction(){

const amount = document.getElementById("amount").value
const category = document.getElementById("category").value
const date = document.getElementById("date").value

if(!amount) return

transactions.push({
amount,
category,
date
})

save()
renderTransactions()
}

function addCategory(){

const newCat = document.getElementById("newCategory").value

if(!newCat) return

categories.push(newCat)

save()
renderCategories()
}

renderCategories()
renderTransactions()
