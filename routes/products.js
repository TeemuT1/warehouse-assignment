import productsController from '../controllers/products.js'
import express from 'express'
import 'express-async-errors'
const productsRouter = express.Router()

productsRouter.get('/', async (req, res) => {
  console.log('got request to get products from cache')
  const result = await productsController.getProductsFromCache()
  res.json(result)
})

export default productsRouter