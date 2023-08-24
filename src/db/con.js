const mongoose =require('mongoose');
const express=require('express')
const app=express();
mongoose.connect("mongodb://localhost:27017/youtubeRegistration",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`no connection`+ e);
})