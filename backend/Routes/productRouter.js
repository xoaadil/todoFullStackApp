const express = require("express")
const todo = require("../Models/product");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

Router.get("/", async (req, res) => {
    const token = req.headers["token"];
    let creatorId = jwt.verify(token, JWT_SECRET).id;
    let alltodos = await todo.find({ creatorId: creatorId })
    res.send(alltodos);
})


Router.post("/new", async (req, res) => {

    const token = req.headers["token"];
    let creatorId = jwt.verify(token, JWT_SECRET).id;
    const { description } = req.body;

    let newtodo = await todo.create({
        description: description,
        isDone: false,
        creatorId: creatorId
    })
    console.log(newtodo);
    res.send({
        message: "new todo is saved",
        newtodo: newtodo
    })
})
Router.put("/:id", async (req, res) => {
    const todoId = req.params.id;
    try {
        let wantedtodo = await todo.findOne({ _id: todoId });
        wantedtodo.isDone = !wantedtodo.isDone;
        await wantedtodo.save();
        res.send({
            message: "todo is updated",
            updatedtodo: wantedtodo
        })
    }
    catch (err) {
        res.send(err);
    }

});
Router.delete("/:id", async (req, res) => {
    const todoId = req.params.id;

    try {
        const deletedTodo = await todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({
            message: "Todo deleted successfully",
            deletedTodo
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting todo", error: err.message });
    }
});




module.exports = Router;