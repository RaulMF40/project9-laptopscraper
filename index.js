require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const laptopsRouter = require('./src/api/routes/laptop')

const app = express()
connectDB()

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use('/api/v1/laptops', laptopsRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found 🧨')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
