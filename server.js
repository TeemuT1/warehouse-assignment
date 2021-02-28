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

//sometimes api fails and gives this response
/*
{
code: 200,
response: "[]"
}
normal response from /availability/:manufacturer
{
  code: 200,
  response: [
    {
    id: "5CDF3D3C78C0BD674FD72",
    DATAPAYLOAD: "<AVAILABILITY> <CODE>200</CODE> <INSTOCKVALUE>INSTOCK</INSTOCKVALUE> </AVAILABILITY>"
    },
    ...
  ]
}
normal response from /products/:category
[
  {
  id: "80831586413299704b7b50c",
  type: "gloves",
  name: "VEDAL NORMAL",
  color: [
  "purple"
  ],
  price: 89,
  manufacturer: "juuran"
  },
  ...
]
*/

app.use(cors())
app.use(express.static(path.join(__dirname, './build')))

app.use('/api/products', productsRouter)
app.use((error, request, response, next) => {middleware.errorHandler(error, request, response, next)})

app.listen(PORT, () => {
  console.log('server started on port 5000')
})

updateCache()

setInterval(() => {
  updateCache()
}, 5 * 60000)

