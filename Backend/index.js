
const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Signup = require("./models/signupSchema");
const Meme = require("./models/MemeSchema"); // New Meme model
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mdb
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const PORT = 3001;

// Save meme route
app.post("/save-meme", async (req, res) => {
  try {
    const { email, imageUrl } = req.body;
    if (!email || !imageUrl) {
      return res.status(400).json({ message: "Missing email or image URL" });
    }

    const newMeme = new Meme({ email, imageUrl });
    await newMeme.save();

    res.status(201).json({ message: "Meme saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving meme", error });
  }
});

// Fetch saved memes
app.get("/my-memes/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const memes = await Meme.find({ email });

    res.status(200).json(memes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching memes", error });
  }
});

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
