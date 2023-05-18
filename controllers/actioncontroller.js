const Todo = require('../models/todoapp')

module.exports.todo = async function (req, res) {
  try {
    if (req.xhr) {
      todos = await Todo.find({})

      todos.sort((a, b) => {
        return b.priority - a.priority
      })
      // console.log(todos)

      return res.status(200).json({
        data: {
          todos: todos,
        },
        message: 'postcreated',
      })
    }
  } catch (err) {
    console.log('error', err)
    return
  }
}

module.exports.createtodo = async function (req, res) {
  try {
    if (req.xhr) {
      let newtodo = await Todo.create({
        description: req.body.description,
        priority: req.body.priority,
      })

      return res.status(200).json({
        data: {
          todo: newtodo,
        },
        message: 'todocreated',
      })
    }
  } catch (error) {
    console.log('facing eror', error)
    return
  }
}

module.exports.completetodo = async (req, res) => {
  try {
    console.log('here')
    if (req.xhr) {
      console.log(req.params)
      const { id } = req.params
      await Todo.findByIdAndUpdate(id, {
        completed: true,
        canceled: false,
        pending: false,
      })

      return res.status(200).json({
        data: {
          todoid: id,
        },
        message: 'todoupdated',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports.canceltodo = async (req, res) => {
  try {
    if (req.xhr) {
      const { id } = req.params
      await Todo.findByIdAndUpdate(id, {
        canceled: true,
        completed: false,
        pending: false,
      })

      return res.status(200).json({
        data: {
          todoid: id,
        },
        message: 'todoupdated',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports.deletetodo = async function (req, res) {
  try {
    if (req.xhr) {
      const { id } = req.params
      const result = await Todo.findByIdAndDelete(id)
      return res.status(200).json({
        data: {
          todoid: id,
        },
        message: 'tododeleted',
      })
    }
  } catch (error) {
    console.log('facing eror', error)
    return
  }
}

module.exports.todocount = async (req, res) => {
  try {
    if (req.xhr) {
      const total = await Todo.find().countDocuments()
      const pending = await Todo.find({
        completed: false,
        canceled: false,
        deleted: false,
      }).countDocuments()
      const canceled = await Todo.find({ canceled: true }).countDocuments()

      const completed = await Todo.find({ completed: true }).countDocuments()

      res.status(200).json({
        data: { total, pending, canceled, completed },
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports.todosort = async (req, res) => {
  try {
    if (req.xhr) {
      const tasks = {
        pending: [],
        canceled: [],
        completed: [],
      }

      tasks.completed = await Todo.find({ completed: true })
      tasks.canceled = await Todo.find({ canceled: true })
      tasks.pending = await Todo.find({ completed: false, canceled: false })

      tasks.completed.sort()
      tasks.pending.sort()
      tasks.canceled.sort()

      res.status(200).json({
        data: tasks,
      })
    }
  } catch (error) {
    console.log(error)
  }
}
