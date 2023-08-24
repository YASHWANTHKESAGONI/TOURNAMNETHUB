const mongoose= require('mongoose')
const employeeSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   zipcode :{
        type:String,
        required:true
    },
    locality :{
        type:String,
        required:true
    }
    // city :{
    //     type:String,
    //     required:true
    // },
    // gameLevel :{
    //     type:String,
    //     required:true
    // }
    // profilePhoto :{
    //     type:String,
    //     required:true
    // }
      
})
//create a collection that is table
const Register = new mongoose.model("Register",employeeSchema)
module.exports=Register