const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Expense = require("./models/Expense");

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));

app.get("/expenses", async(req,res)=>{
 const expenses = await Expense.find();
 res.json(expenses);
});

app.post("/expenses", async(req,res)=>{
 const expense = new Expense(req.body);
 await expense.save();
 res.json(expense);
});

app.delete("/expenses/:id", async(req,res)=>{
 await Expense.findByIdAndDelete(req.params.id);
 res.json({message:"Deleted"});
});

app.listen(5000, ()=>{
 console.log("Server started on port 5000");
});
app.post("/login",(req,res)=>{

const {email,password}=req.body;

if(email==="admin@gmail.com" && password==="1234"){

res.json({success:true});

}else{

res.json({success:false});

}

});