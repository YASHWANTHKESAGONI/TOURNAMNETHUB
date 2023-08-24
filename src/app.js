const express=require('express')
const path=require('path')
const app=express();
const hbs=require('hbs')
require("./db/con")
const Register=require('./models/register')
const Player=require('./models/activity')
const port=process.env.PORT || 3000;
// const static_path=path.join(__dirname,"../public");
// app.use(express.static(static_path))
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
hbs.registerPartials(partials_path)
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.set("view engine","hbs");
app.set("views",template_path)
app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/login",(req,res)=>{
res.render("login.hbs")
})
app.get("/register",(req,res)=>{
    res.render("register.hbs");
})

app.get("/createactivity",(req,res)=>{
    res.render("createactivity.hbs")
})
app.get("/playgames",(req,res)=>{
    res.render("playgames")
})

// create a new user in our database
app.post("/register",async (req,res)=>{
try{
const password= req.body.password;
const cpassword=req.body.confirmpassword;
 if(password===cpassword){
    const registerEmployee = new Register({
    username : req.body.username,
    email : req.body.email,
    zipcode: req.body.zipcode,
    locality : req.body.locality,
    password :req.body.password,
    confirmpassword:req.body.confirmpassword
  })
     const registered=await registerEmployee.save();
     res.status(201).render("home.hbs")
 }
 else{
    res.send("passwords are not matching")
 }
} catch(error){
    res.status(404).send(error)
}
})
//login route and validation
    
  app.post('/login',async (req,res)=>{
    try{
     const check = await Register.findOne({username:req.body.username})

       if(check.password===req.body.password){
        res.render('home.hbs')
       }
       else{
        res.send("wrong password")
       }

    }catch(e){
        res.send("put valid credentials")
    }
  });

//storing activities of players 
app.post("/createactivity",async (req,res)=>{
    try{
      console.log("tinku")
       if(Register.findOne({username:req.body.username})){
        const activity = new Player({
          locality : req.body.locality,
          date : req.body.date,
          time: req.body.time,
          sport : req.body.sport,
          username:req.body.username
        })
         const entered=await activity.save();
         res.status(201).render("playgames.hbs")
        }
        else{
          res.send("NO username")
        }
    } catch(error){
        res.status(404).send(error)
    }
    })


    
    //show data for players
       app.post('/playgames', async (req, res) => {
        const city = req.body.locality;
        const sport=req.body.sport;

        const condition = { locality: city , sport: sport};

        try {
          // Retrieve data from MongoDB
          const data = await Player.find({ locality: city, sport: sport });
          // Render the HBS template and pass the data as an object
          res.render('results', { data });
        } catch (err) {
          console.error('Error retrieving data:', err);
          // Handle the error appropriately
        }
      });
      
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})