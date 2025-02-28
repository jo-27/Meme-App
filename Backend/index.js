const express = require("express");
const mdb = require("mongoose");
const dotenv=require('dotenv');
const Signup=require("./models/signupSchema");
const app = express();
const PORT = 3001;
dotenv.config();
app.use(express.json())
mdb
  .connect("mongodb+srv://joansharon:sharon%4004@merndemo.bajzf.mongodb.net/Meme-App")
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
        const {name,email,password}=req.body
    const newSignup=new Signup({
        name:name,
        email:email,
        password:password
    });
    await newSignup.save()
    console.log("signup sucess")
    res.status(201).json({message:"Signup Successfull",isSignup:true})
        
    } catch (error) {
        res.status(201).json({message:"Signup UnSuccessfull",isSignup:false})
    }

})

app.listen(PORT, () => console.log("server started successfully"));