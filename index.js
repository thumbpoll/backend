require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const app = express()

app.use(express.json())

app.use('/', (req, res) => {
  res.send({
    message: 'Hello World'
  })
})

app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`)
})