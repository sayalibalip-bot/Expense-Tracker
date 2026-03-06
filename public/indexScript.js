const form = document.getElementById("expenseForm");

function hidePages(){

document.querySelectorAll(".page").forEach(p=>p.style.display="none")

}

function showDashboard(){

hidePages()

}

function showAdd(){

hidePages()
document.getElementById("addExpense").style.display="block"

}

function showHistory(){

hidePages()
document.getElementById("history").style.display="block"
loadExpenses()

}

function showCharts(){

hidePages()
document.getElementById("charts").style.display="block"
loadExpenses()

}

function showVision(){

hidePages()
document.getElementById("vision").style.display="block"

navigator.mediaDevices.getUserMedia({video:true})

.then(stream=>{

document.getElementById("video").srcObject=stream

})

}

function showAdvice(){

hidePages()

document.getElementById("advice").style.display="block"

generateAdvice()

}


form.addEventListener("submit",async(e)=>{

e.preventDefault()

const formData = new FormData(form)

await fetch("/add-expense",{

method:"POST",
body:formData

})

alert("Expense Added")

form.reset()

})


async function loadExpenses(){

const res = await fetch("/all-expenses")

const data = await res.json()

const table = document.getElementById("expenseTable")

table.innerHTML=""

let total=0

let categoryData={}

data.forEach(exp=>{

total+=Number(exp.amount)

if(!categoryData[exp.category]){

categoryData[exp.category]=0

}

categoryData[exp.category]+=Number(exp.amount)

table.innerHTML+=`

<tr>

<td>${exp.title}</td>
<td>${exp.amount}</td>
<td>${exp.category}</td>
<td>${exp.date}</td>
<td>${exp.bill ? `<a href="/uploads/${exp.bill}" target="_blank">View</a>`:""}</td>
<td><button onclick="deleteExpense('${exp._id}')">Delete</button></td>

</tr>

`

})

document.getElementById("totalAmount").innerText=total

createCharts(data,categoryData)

}


function createCharts(data,categoryData){

new Chart(document.getElementById("barChart"),{

type:"bar",

data:{

labels:data.map(e=>e.title),

datasets:[{

label:"Expenses",

data:data.map(e=>e.amount)

}]

}

})

new Chart(document.getElementById("pieChart"),{

type:"pie",

data:{

labels:Object.keys(categoryData),

datasets:[{

data:Object.values(categoryData)

}]

}

})

}


async function deleteExpense(id){

await fetch("/delete-expense/"+id,{method:"DELETE"})

loadExpenses()

}


function generateAdvice(){

document.getElementById("adviceText").innerText=

"Tip: Try to reduce unnecessary spending and track monthly budget."

}

loadExpenses()