import React from 'react'
import ProductTable from './ProductTable'

import { render } from '@testing-library/react'

describe('Component ProductTable', () => {

  let testgloves = [
    {
      id:'testid1',
      name: 'great gl',
      type: 'glove',
      color: ['green'],
      price: 300,
      manufacturer: 'nokia',
      availability: 'INSTOCK'
    },
    {
      id:'2',
      name: 'glove two',
      type: 'glove',
      color: ['green', 'blue'],
      price: 300,
      manufacturer: 'muk',
      availability: 'OUTOFSTOCK'
    }
  ]

  test('renders without crashing', () => {
    render(
      <ProductTable products={testgloves}/>
    )
  })

  // Cannot really test like this, because react-fluid-table does not render table rows without a window..
/*
  test('table includes product details', () => {
    const { getByText } = render(
      <ProductTable products={testgloves}/>
    )

    expect(getByText('Id')).toBeVisible()
    expect(getByText('Name')).toBeVisible()
    expect(getByText('Type')).toBeVisible()
    expect(getByText('Colors')).toBeVisible()
    expect(getByText('Price')).toBeVisible()
    expect(getByText('Manufacturer')).toBeVisible()
    expect(getByText('Availability')).toBeVisible()

    expect(getByText('testid1')).toBeVisible()
    expect(getByText('great gl')).toBeVisible()
    expect(getByText('glove')).toBeVisible()
    expect(getByText('green')).toBeVisible()
    expect(getByText('300')).toBeVisible()
    expect(getByText('nokia')).toBeVisible()
    expect(getByText('INSTOCK')).toBeVisible()
  })
*/
})

