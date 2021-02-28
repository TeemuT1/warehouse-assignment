import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import productService from './services/products'
import NavMenu from './components/NavMenu'
import ProductTable from './components/ProductTable'
import { useInterval } from './hooks/useInterval'

const App = () => {
  const [gloves, setGloves] = useState(null)
  const [beanies, setBeanies] = useState(null)
  const [facemasks, setFacemasks] = useState(null)
  const REFETCH_DATA_PERIOD_IN_MINUTES = 1

  useEffect(() => {
    productService
      .getAll()
      .then(receivedProducts => {
        setGloves(receivedProducts.gloves)
        setBeanies(receivedProducts.beanies)
        setFacemasks(receivedProducts.facemasks)
      }).catch(e => alert('Server did not receive data from legacy api yet, try again soon'))
  }, [])

  useInterval(() => {
    productService
      .getAll()
      .then(receivedProducts => {
        setGloves(receivedProducts.gloves)
        setBeanies(receivedProducts.beanies)
        setFacemasks(receivedProducts.facemasks)
      }).catch(e => alert('Could not refetch data'))
  }, 1000 * 60 * REFETCH_DATA_PERIOD_IN_MINUTES)

  if(!gloves || !facemasks || !beanies) {
    return(
      <div>loading...</div>
    )
  }

  return(
    <div className="container">
      <NavMenu/>

      <Switch>

        <Route path="/beanies">
          <ProductTable products={beanies} />
        </Route>

        <Route path="/facemasks">
          <ProductTable products={facemasks} />
        </Route>

        <Route path="/gloves">
          <ProductTable products={gloves} />
        </Route>

        <Redirect from="/" to="/gloves" />

      </Switch>
    </div>
  )
}

export default App
