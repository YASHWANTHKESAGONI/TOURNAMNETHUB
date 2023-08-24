const mongoose= require('mongoose')

const player = new mongoose.Schema({

locality:{
    type:String,
    required:true
},
date:{
    type:String,
    required:true
},
time:{
    type:String,
    required:true
},
sport:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true
}

})
//create a collection that is table
const Player = new mongoose.model("Player",player)
module.exports=Player