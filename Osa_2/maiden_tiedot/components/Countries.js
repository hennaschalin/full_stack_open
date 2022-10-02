import React from 'react'
import Country from './Country'
import { useState } from 'react'
import Weather from './Weather'

const Countries = (props) => {

    const [isShown, setIsShown] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState()

    let filteredCountries = props.countries.filter(country =>
        country.name.common.toUpperCase().includes(props.filter.toUpperCase())
      )
    
      const handleClick = (country) => {
        console.log(country)
        setSelectedCountry(country)
        setIsShown(true)
      }

      console.log(filteredCountries.length)
      if (isShown) {
        const country = selectedCountry
         
         return (
            <>
                <Country 
                    key= {country.name.common} 
                    name={country.name.common} 
                    capital={country.capital}
                    area={country.area} 
                    languages={country.languages}
                    flags={country.flags}
                    /> 
                    <Weather country={country}/> 
            </>
    )}

    if (filteredCountries.length >= 10) {
        return <p> Too many matches, specify another filter</p>
    } else if (filteredCountries.length <=10 && filteredCountries.length > 1 ) {
    console.log(filteredCountries.length)
        return (
            filteredCountries.map(country => (
            <>
                <p key= {country.name.common}>{country.name.common}
                </p>
                <button onClick={() => handleClick(country)}>show</button> 
            </>              
                )) 
            )} 
    else if (filteredCountries.length === 1 || isShown) {
        return (
            filteredCountries.map(country => (
            <>
            <Country 
            key= {country.name.common} 
            name={country.name.common} 
            capital={country.capital}
            area={country.area} 
            languages={country.languages}
            flags={country.flags}
            />  
            <Weather country={country}/> 
            </>
                    ))
                    )}

}

  export default Countries