const express = require ("express")
const mongoose = require("mongoose")
const path = require('path')
const app = express();
const userModel = require('../models/user.model.js')

mongoose.connect("mongodb://127.0.0.1:27017/loginpageDB")

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/',function(req,res){
    res.render("index")
})

app.post('/create',async function(req,res){
    let user = await userModel.create({
        name : req.body.name,
        email : req.body.email,
        image : req.body.image,
    })
    res.redirect('/allfile')
})

app.get('/allfile',async function(req, res){
    let allUsers = await userModel.find()
    res.render('allfile',{userdata : allUsers})
})

app.get('/delete/:id',async function(req,res){
    await userModel.findOneAndDelete({_id : req.params.id})
    res.redirect('/allfile')
})

app.get('/edit/:id',async function(req,res){
    let user = await userModel.findOne({_id : req.params.id})
    res.render("edit",{user})
})

app.post('/edit/:id',async function(req,res){
    let {name,email,image} =req.body
    let user = await userModel.findOneAndUpdate({_id : req.params.id}, {name,email,image},{new : true})
    res.redirect("/allfile")
})

app.listen('3000');
