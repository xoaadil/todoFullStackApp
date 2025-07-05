const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const userSchema= new Schema({
    name :{
        type : String,
        require: true
    },
     email :{
        type : String,
        require: true,
        unique :true
    },
    password :{
        type : String,
        require: true
    }
})
let userModel=mongoose.model("users",userSchema);
module.exports = userModel;