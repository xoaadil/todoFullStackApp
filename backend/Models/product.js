const mongoose=require("mongoose");
const Schema=mongoose.Schema;
let ObjectId=Schema.ObjectId;
const todoSchema= new Schema({
    creatorId : ObjectId,
    description : String,
    isDone : Boolean
})
let todo = mongoose.model("todo",todoSchema)
module.exports=todo;