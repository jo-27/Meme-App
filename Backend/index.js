
const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Signup = require("./models/signupSchema");
const Meme = require("./models/MemeSchema"); 
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Change limit to 10MB (or more)
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

mdb
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const PORT = 3001;

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, "your_jwt_secret");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

app.post("/save-meme", authMiddleware, async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!req.user || !req.user.email || !imageUrl) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const newMeme = new Meme({ email: req.user.email, imageUrl });
    await newMeme.save();

    res.status(201).json({ message: "Meme saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving meme", error });
  }
});

app.get("/my-memes", authMiddleware, async (req, res) => {
  try {
    const memes = await Meme.find({ email: req.user.email });

    res.status(200).json({ success: true, memes });
  } catch (error) {
    console.error("❌ Error fetching memes:", error);
    res.status(500).json({ success: false, message: "Error fetching memes" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Signup.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found, sign up first", isLoggedin: false });
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect password", isLoggedin: false });
    }

    // **Create Payload for JWT**
    const payload = {
      firstname: existingUser.name,
      email: existingUser.email
    };

    // **Sign JWT Token** (expires in 1 hour)
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });
    console.log("Login Response:", { 
      message: "Login successful",
      isLoggedin: true,
      token,
      email: existingUser.email,   // 🔄 FIX: Ensure `firstname` is included
    });
    // **Send Token and User Info to Frontend**
    res.status(200).json({ 
      message: "Login successful", 
      isLoggedin: true, 
      token, 
      email: existingUser.email 
    });

  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Login error, check your code", isLoggedin: false });
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
