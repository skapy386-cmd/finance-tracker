// подключение Supabase
const supabaseClient = supabase.createClient(
"https://mhssctiyqzvycoyganct.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oc3NjdGl5cXp2eWNveWdhbmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDM4MTMsImV4cCI6MjA4ODMxOTgxM30.xOriQ-w57-67992R9CUkxEYnyCDJkgzUCOMWFwDxXLo"
)

let transactions = []
let categories = ["Food","Transport","Other"]

const categorySelect = document.getElementById("category")
const list = document.getElementById("list")

// загрузка транзакций из базы
async function loadTransactions(){

const { data, error } = await supabaseClient
.from("transactions")
.select("*")
.order("id",{ascending:false})

if(error){
console.log(error)
return
}

transactions = data
renderTransactions()

}

// отображение транзакций
function renderTransactions(){

list.innerHTML=""

transactions.forEach(t=>{

const li = document.createElement("li")

li.textContent =
`${t.date} | ${t.category} | ${t.amount}`

list.appendChild(li)

})

}

// отображение категорий
function renderCategories(){

categorySelect.innerHTML=""

categories.forEach(cat=>{

const option=document.createElement("option")

option.value=cat
option.textContent=cat

categorySelect.appendChild(option)

})

}

// добавление транзакции
async function addTransaction(){

const amount=document.getElementById("amount").value
const category=document.getElementById("category").value
const date=document.getElementById("date").value

if(!amount) return

const { error } = await supabaseClient
.from("transactions")
.insert([
{
category:category,
amount:amount,
date:date
}
])

if(error){
console.log(error)
return
}

loadTransactions()

}

// добавление категории
function addCategory(){

const newCat=document.getElementById("newCategory").value

if(!newCat) return

categories.push(newCat)

renderCategories()

}

// загрузка сайта
window.onload=()=>{

renderCategories()
loadTransactions()

}
