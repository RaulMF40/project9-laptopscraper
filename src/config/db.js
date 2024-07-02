const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const DB_URL =
      'mongodb+srv://webscrapping:z55xi6wvC2YdjD1O@cluster0.nzfy3zs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    await mongoose.connect(DB_URL)
    console.log('Connected to DB')
  } catch (error) {
    console.log('Not Connected to DB', error)
  }
}

module.exports = connectDB
