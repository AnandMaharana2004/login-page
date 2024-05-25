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
        image : req.body.image
    })
    res.redirect('/allfile')
})

app.get('/allfile',async function(req, res){
    let allUsers = await userModel.find()
    res.render('allfile',{userdata : allUsers})
})


app.listen('3000');