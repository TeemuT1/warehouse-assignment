import React from 'react'
import NavMenu from './NavMenu'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Component NavMenu', () => {
  test('component renders with correct menu items', () => {
    const { getByText } = render(
      <Router><NavMenu/></Router>
    )
    expect(getByText('Gloves')).toBeVisible()
    expect(getByText('Beanies')).toBeVisible()
    expect(getByText('Facemasks')).toBeVisible()
  })
})
