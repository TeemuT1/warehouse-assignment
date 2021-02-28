/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import { Table } from 'react-fluid-table'

const ProductTable = ({ products }) => {

  const columns = [
    { key: 'id', header: 'Id', width: 230 },
    { key: 'name', header: 'Name' },
    { key: 'type', header: 'Type' },
    { key: 'color', header: 'Colors',
      content: ({ row }) => <div>{ row.color.map(c => (<div key={c}>{c}</div>)) }</div> },
    { key: 'price', header: 'Price' },
    { key: 'manufacturer', header: 'Manufacturer' },
    { key: 'availability', header: 'Availability' }
  ]

  return(
    <Table
      data={products}
      columns={columns}
      tableHeight={window.innerHeight}
      rowHeight={100}
    />
  )
}

export default ProductTable