const express = require("express");
const path=require('path');
const fs=require("fs");
const app = express();
//const mongoose=require("mongoose");

const mongoose = require('mongoose');
const bodyparser=require('body-parser');
mongoose.connect('mongodb://localhost/contactYash', {useNewUrlParser: true});



const port = 80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    
  });

  const Contact = mongoose.model('Contact', contactSchema);



app.use('/static',express.static('static'));

app.use(express.urlencoded());
//set the template engine as pug pug related
app.set('view engine','pug');

//set view directory
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send('this item is saved to database')
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })
    //res.status(200).render('contact.pug');
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


