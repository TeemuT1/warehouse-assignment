import express from 'express'
import path from 'path'
import cors from 'cors'
import middleware from './utils/middleware.js'
import productsRouter from './routes/products.js'
import productsController from './controllers/products.js'
import 'express-async-errors'
const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT || 5000

const updateCache = async () => {
  try {
    await productsController.updateCacheWithProductsFromBadApi()
  } catch(e) {
    console.log('error when trying to update cache from bad api\n', e.message)
  }
}

app.use(cors())
app.use(express.static(path.join(__dirname, './build')))

app.use('/api/products', productsRouter)

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './build', 'index.html'))
})

app.use((error, request, response, next) => {middleware.errorHandler(error, request, response, next)})

app.listen(PORT, () => {
  console.log('server started on port 5000')
})

//fetch initial data from legacy api and save to cache
updateCache()

//update cache every 5 minutes
setInterval(() => {
  updateCache()
}, 5 * 60 * 1000)