import axios from 'axios'
import NodeCache from 'node-cache'
const productsCache = new NodeCache()
const BASE_API_URL = 'https://bad-api-assignment.reaktor.com/'
const API_PRODUCTS_URL = 'v2/products/'
const API_AVAILABILITY_URL = 'v2/availability/'
const CATEGORIES = ['gloves', 'facemasks', 'beanies']

const getProductsFromCache = () => {

  const cachedProducts = productsCache.get('products')

  if(cachedProducts === undefined) {
    throw Error('cache empty')
  }

  return cachedProducts
}

const updateCacheWithProductsFromBadApi = async () => {

  let productData = {}
  let availabilityData = {}
  let manufacturers = new Set()

  //get all products from bad api
  productData = await getProductsFromBadApi()

  //go through all products in all categories and save all manufacturers in a set
  manufacturers = getManufacturers(productData)

  //fetch availability data for all manufacturers from the bad api
  availabilityData = await getAvailabilitiesFromBadApi(manufacturers)

  //combine product availability to the lists of products
  for(let category in productData) {
    productData[category].forEach(product => {
      const availability = availabilityData[product.manufacturer].find(element => element.id.toLowerCase() === product.id)

      product.availability = availability.DATAPAYLOAD.match('<INSTOCKVALUE>(.*)</INSTOCKVALUE>')[1]

    })
  }

  productsCache.set('products', productData)
  console.log('cache updated')
}

const getProductsFromBadApi = async () => {
  let productData = {}

  for(let category of CATEGORIES) {
    let result = []
    let tries = 0

    while (!result.data || result.data === [] && tries < 10) {
      result = await axios.get(BASE_API_URL +
          API_PRODUCTS_URL + category)
      tries++
    }

    if (!result.data) {
      throw Error('could not get products from bad api')
    }

    productData[category] = result.data
  }
  return productData
}

const getManufacturers = (productData) => {
  let manufacturers = new Set()
  for(let category in productData) {
    productData[category].forEach(product => {
      manufacturers.add(product.manufacturer)
    })
  }
  return manufacturers
}

const getAvailabilitiesFromBadApi = async (manufacturers) => {
  let availabilityData = {}
  let availabilityRequestsToDo = []

  //bad api is slow. let's make a list of requests for all manufacturers and send them at the same time
  manufacturers.forEach(manufacturer => {
    availabilityRequestsToDo.push(getAvailabilityFromBadApi(manufacturer))
  })
  const availabilityResults = await Promise.all(availabilityRequestsToDo)
  availabilityResults.forEach(result => {
    if(!result.data.response) {
      throw Error('no proper availability data from bad api')
    }
    availabilityData[result.manufacturer] = result.data.response
  })
  return availabilityData
}

const getAvailabilityFromBadApi = async (manufacturer) => {
  let result = []
  let tries = 0

  //sometimes bad api returns a string '[]' instead of proper data. let's try enough many times
  while ((!result.data || !result.data.response || result.data.response === '[]') && tries < 10) {

    result = await axios.get(BASE_API_URL + API_AVAILABILITY_URL + manufacturer, { headers: {
      'x-force-error-mode': ''
    }
    })
    tries++
  }

  if (!result.data || !result.data.response || result.data.response === '[]') {
    throw Error(`could not get availability info from bad api for manufacturer "${manufacturer}"`)
  }

  //add manufacturer to the result to find it easier later
  result.manufacturer = manufacturer
  return result
}

export default { updateCacheWithProductsFromBadApi, getProductsFromCache }