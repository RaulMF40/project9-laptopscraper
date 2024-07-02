const Laptop = require('../models/laptop')

// Crear un nuevo producto
//!------------------
const addLaptop = async (req, res, next) => {
  try {
    const newLaptop = new Laptop(req.body)
    const existingLaptop = await Laptop.findOne({ title: req.body.title })
    if (existingLaptop) {
      return res.status(400).json('Este portatil ya está registrado')
    }
    const savedLaptop = await newLaptop.save()
    return res.status(201).json(savedLaptop)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
//!---------------

// Actualizar un producto por ID
//!-------------------
const editLaptop = async (req, res, next) => {
  try {
    const { id } = req.params
    const newLaptop = new Laptop(req.body)
    newLaptop._id = id
    const updatedLaptop = await Laptop.findByIdAndUpdate(id, newLaptop, {
      new: true
    })
    return res.status(200).json({
      message: 'Portatil actualizado correctamente',
      juego: updatedLaptop
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}
//!----------------------
// Eliminar un producto por ID
//!--------------------
const deleteLaptop = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedLaptop = await Laptop.findByIdAndDelete(id)
    if (deletedLaptop) {
      return res
        .status(200)
        .json({ mensaje: 'Portatil eliminado', laptop: deletedLaptop })
    } else {
      return res.status(404).json('Portatil no encontrado')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}
//!---------------------
const getLaptop = async (req, res, next) => {
  try {
    const allLaptop = await Laptop.find().populate('laptop')
    if (allLaptop.length === 0) {
      return res
        .status(204)
        .json('Todavía no hay portatiles cargados en la base de datos')
    }
    return res.status(200).json(allLaptop)
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: 'Error buscando los portatiles', error: error })
  }
}
//!-----------
module.exports = { addLaptop, editLaptop, deleteLaptop, getLaptop }
