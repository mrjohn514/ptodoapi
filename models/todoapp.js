const mongoose = require('mongoose') //adding mongoose module

const todoschema = new mongoose.Schema({
  description: String,
  priority: Number,
  completed: {
    type: Boolean,
    default: false,
  },
  canceled: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
})

//we need to tell what would be the name of collection using this schema and so Todo is the name of
//collection in database
const Todo = mongoose.model('Todo', todoschema)

module.exports = Todo
