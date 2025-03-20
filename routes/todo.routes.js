const todo = require("../controllers/todo.controller")

const router = require("express").Router()

router
    .post("/create", todo.createTodo)
    .get("/read", todo.readTodo)
    .get("/update", todo.updateTodo)
    .get("/delet", todo.deleteTodo)

module.exports = router