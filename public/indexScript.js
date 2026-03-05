const form = document.getElementById("expenseForm");
const list = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

let expenses = [];

let pieChart;
let barChart;

form.addEventListener("submit",function(e){

e.preventDefault();

const title=document.getElementById("title").value;
const amount=parseInt(document.getElementById("amount").value);
const category=document.getElementById("category").value;

const expense={
id:Date.now(),
title,
amount,
category
};

expenses.push(expense);

render();

form.reset();

});

function render(){

list.innerHTML="";

let total=0;

expenses.forEach(e=>{

total+=e.amount;

const li=document.createElement("li");

li.innerHTML=`
${e.title} - ₹${e.amount}

<button onclick="deleteExpense(${e.id})">Delete</button>
`;

list.appendChild(li);

});

totalEl.innerText=total;

drawCharts();

}

function deleteExpense(id){

expenses=expenses.filter(e=>e.id!==id);

render();

}

function drawCharts(){

const categories={};

expenses.forEach(e=>{
categories[e.category]=(categories[e.category]||0)+e.amount;
});

const labels=Object.keys(categories);
const values=Object.values(categories);

if(pieChart) pieChart.destroy();

pieChart=new Chart(document.getElementById("pieChart"),{

type:"pie",

data:{
labels:labels,
datasets:[{
data:values
}]
}

});

if(barChart) barChart.destroy();

barChart=new Chart(document.getElementById("barChart"),{

type:"bar",

data:{
labels:labels,
datasets:[{
data:values
}]
}

});

}

document.getElementById("darkBtn").onclick=function(){

document.body.classList.toggle("dark");

};