const mongoose = require('mongoose')

const laptopSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, unique: true },
    price: { type: String, trim: true, required: true, unique: true },
    image: { type: String, trim: true, required: true }
  },
  {
    timestamps: true,
    collection: 'laptops'
  }
)

const Laptop = mongoose.model('laptop', laptopSchema, 'laptops')

module.exports = Laptop
