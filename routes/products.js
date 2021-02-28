import productsController from '../controllers/products.js'
import express from 'express'
import 'express-async-errors'
const productsRouter = express.Router()

productsRouter.get('/', async (req, res) => {
  const result = await productsController.getProductsFromCache()
  res.json(result)
})

export default productsRouter