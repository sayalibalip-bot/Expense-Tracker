const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const Expense = require("./models/Expense");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
.then(()=>console.log("MongoDB Connected"));

const storage = multer.diskStorage({

destination:"uploads/",

filename:(req,file,cb)=>{
cb(null,Date.now()+path.extname(file.originalname))
}

});

const upload = multer({storage:storage});

app.post("/add-expense",upload.single("bill"),async(req,res)=>{

const expense = new Expense({

title:req.body.title,
amount:req.body.amount,
category:req.body.category,
date:req.body.date,
bill:req.file ? req.file.filename : ""

});

await expense.save();

res.send("Expense Added");

});

app.get("/all-expenses",async(req,res)=>{

const expenses = await Expense.find();

res.json(expenses);

});

app.delete("/delete-expense/:id",async(req,res)=>{

await Expense.findByIdAndDelete(req.params.id);

res.send("Deleted");

});

app.listen(5000,()=>{

console.log("Server Running On 5000");

});