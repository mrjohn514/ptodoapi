const express = require('express')

const path = require('path')
// Setup router
const router = express.Router()

// Setting path for controller function
const TodoController = require('../controllers/actioncontroller')

router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../index.html')
  res.sendFile(filePath)
})

router.get('/todo', TodoController.todo)

router.post('/create-todo', TodoController.createtodo)

router.delete('/delete-todo/:id', TodoController.deletetodo)

router.put('/complete-todo/:id', TodoController.completetodo)

router.put('/cancel-todo/:id', TodoController.canceltodo)

router.get('/count-todo', TodoController.todocount)

router.get('/sort-todo', TodoController.todosort)

// Exporting router
module.exports = router
