const {
  addLaptop,
  getLaptops,
  editLaptop,
  deleteLaptop
} = require('../controllers/laptop')

const laptopsRouter = require('express').Router()

laptopsRouter.post('/add', addLaptop)
laptopsRouter.get('/', getLaptops)
laptopsRouter.put('/:id', editLaptop)
laptopsRouter.delete('/:id', deleteLaptop)

module.exports = laptopsRouter
