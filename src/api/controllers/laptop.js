const Laptop = require('../models/laptop')

// Crear un nuevo producto
const addLaptop = async (req, res, next) => {
  try {
    const existingLaptop = await Laptop.findOne({ title: req.body.title })
    if (existingLaptop) {
      return res.status(400).json('Este portatil ya está registrado')
    }

    const newLaptop = new Laptop(req.body)
    const savedLaptop = await newLaptop.save()
    return res.status(201).json(savedLaptop)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// Actualizar un producto por ID
const editLaptop = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedLaptop = await Laptop.findByIdAndUpdate(id, req.body, {
      new: true
    })

    if (!updatedLaptop) {
      return res.status(404).json('Portatil no encontrado')
    }

    return res.status(200).json({
      message: 'Portatil actualizado correctamente',
      laptop: updatedLaptop
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// Eliminar un producto por ID
const deleteLaptop = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedLaptop = await Laptop.findByIdAndDelete(id)

    if (!deletedLaptop) {
      return res.status(404).json('Portatil no encontrado')
    }

    return res.status(200).json({
      mensaje: 'Portatil eliminado',
      laptop: deletedLaptop
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// Obtener todos los laptops
const getLaptops = async (req, res, next) => {
  try {
    const allLaptops = await Laptop.find()
    if (allLaptops.length === 0) {
      return res
        .status(204)
        .json('Todavía no hay portatiles cargados en la base de datos')
    }
    return res.status(200).json(allLaptops)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      mensaje: 'Error buscando los portatiles',
      error: error
    })
  }
}

module.exports = { addLaptop, editLaptop, deleteLaptop, getLaptops }
