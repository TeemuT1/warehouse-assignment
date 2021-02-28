const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if(error.message === 'cache empty') {
    return response.status(404).send({ error: 'cache data not ready yet' })
  }
  next(error)
}

export default { errorHandler }