const express = require("express");
const mdb = require("mongoose");
const dotenv=require('dotenv');
const bcrypt = require("bcrypt");
const Signup=require("./models/signupSchema");
const app = express();
const cors=require("cors");
app.use(cors({ origin: "*" }));
const PORT = 3001;
dotenv.config();
app.use(express.json())
mdb
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MBD sucess");
  })
  .catch((err) => {
    console.log("cheack you string", err);
  });

app.get("/", (req, res) => {
  res.send("<h1>welcome back<h1>");
});

app.post("/signup",async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    const newSignup=new Signup({
        name:name,
        email:email,
        password:hashedPassword
    });
    await newSignup.save()
    console.log("signup sucess")
    res.status(201).json({message:"Signup Successfull",isSignup:true})
        
    } catch (error) {
        res.status(201).json({message:"Signup UnSuccessfull",isSignup:false})
    }

})

app.post("/login", async(req, res) => {
  try {
    const{email,password}=req.body
    const exitingUser=await Signup.findOne({email:email})
    console.log(exitingUser)
    if(exitingUser){
      const isValidPassword=await bcrypt.compare(password,exitingUser.password)
      if(isValidPassword){
        const payload={
          firstname:exitingUser.firstName,
          email:exitingUser.email
        }
        res.status(201).json({message:"login successfull",isLoggedin:true})
      }
      else{
        res.status(201).json({message:"incorrect password",isLoggedin:false})
      }
    }
    else{
      res.status(201).json({message:"user not found sigup first",isLoggedin:false})
    }
  } catch (error) {
    console.log("login error");
    res.status(400).json({message:"login error check your code",isLoggedin:false})
  }
});

app.listen(PORT, () => console.log("server started successfully"));