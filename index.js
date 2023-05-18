const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const db = require('./config/mongoose')

app.use(express.static('assets'))
// API routes
app.use('/', require('./routes'))

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
