import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = React.useState([])
  const [filter, setFilter] = React.useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter value = {filter} onChange={handleFilterChange}/>
      <Countries 
      countries={countries}
      filter={filter}
      /> 

    </div>
  )

}

export default App
