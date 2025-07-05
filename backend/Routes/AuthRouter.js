const express = require("express");
const Router = express.Router();
const { loginValidation,signupValidation}=require("../Middlewares/authValidation")
const {signup,login} =require("../Controllers/authController")

Router.post("/login",loginValidation,login,(req,res)=>{
     console.log("🎉 login successful! All checks passed")

    res.send({success : true,
        message :"login complete",
        token : req.token,
        name :req.name
    })
});

Router.post("/signup",signupValidation,signup,(req,res)=>{
    console.log("🎉 Signup successful! All checks passed")
    res.send({
        success: true,
  message: "User registered successfully"})
})

module.exports= Router;