import React, { useState, useEffect } from 'react'
import {Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Pagination } from '@mui/material'
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchData(page) {
    const response = await fetch(`https://reqres.in/api/products?page=${page}`);
    const data = await response.json();
    setData(data);
    setProductData(data.data);
  }
  
  useEffect(() => {
    fetchData(page);
  }, [page])
  

  return (
    <div className="App">
      <div className='table'>
        <h1>Products</h1>
        <TableContainer sx={{py: 4, width: '100%'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Pantone Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.map((product) => (
                <TableRow key={product.id}sx={{bgcolor: product.id % 2 == 0 ? 'none' : 'rgba(10,100,250,0.1)'}}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell><strong>{product.name}</strong></TableCell>
                  <TableCell>{product.year}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.pantone_value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            sx={{py: 2}}
            count={data.total_pages}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </TableContainer>
      </div>
    </div>
  )
}

export default App
