const {
  addLaptop,
  getLaptop,
  editLaptop,
  deleteLaptop
} = require('../controllers/laptop')

const laptopsRouter = require('express').Router()

laptopsRouter.post('/add', addLaptop)
laptopsRouter.get('/', getLaptop)
laptopsRouter.put('/:id', editLaptop)
laptopsRouter.delete('/:id', deleteLaptop)

module.exports = laptopsRouter
