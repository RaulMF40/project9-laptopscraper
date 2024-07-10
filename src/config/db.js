const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const DB_URL =
      'mongodb+srv://webscrapping:vDCcrhA2Zb8aH8t@cluster0.nzfy3zs.mongodb.net/?appName=Cluster0'
    await mongoose.connect(DB_URL)
    console.log('Connected to DB')
  } catch (error) {
    console.log('Not Connected to DB', error)
  }
}

module.exports = { connectDB }
