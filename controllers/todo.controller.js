// addtodo
// gettodo
// updatetodo
// deleteTodo

const Todo = require("../models/Todo")

exports.createTodo = async (req, res) => {
    try {

        res.json({ message: " createTodo success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to create",
            error: error.message
        })
    }
}

exports.readTodo = async (req, res) => {
    try {
        const result = await Todo.find()
        res.json({ message: " readTodo success", result })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to read",
            error: error.message
        })

    }
}
exports.updateTodo = async (req, res) => {
    try {

        res.json({ message: " updateTodo success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to update",
            error: error.message
        })

    }
}
exports.deleteTodo = async (req, res) => {
    try {
        res.json({ message: " deleteTodo success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to update",
            error: error.message
        })

    }
}