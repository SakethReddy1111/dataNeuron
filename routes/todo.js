const express = require('express');
const router = express.Router();
const TodoController = require("../controllers/todo")

router.get("/getTodo", TodoController.getTodo)
router.post("/addTodo", TodoController.addTodo)
router.patch("/updateTodo", TodoController.updateTodo)
router.delete("/deleteTodo", TodoController.deleteTodo)

module.exports = router;