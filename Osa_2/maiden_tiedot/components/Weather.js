import React from 'react'
import Country from './Country'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {

    const apiKey = process.env.REACT_APP_API_KEY
    const [temperature, setTemperature] = useState ();
    const [icon, setIcon] = useState();
    const [wind, setWind] = useState();

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`)
            .then(response => {
                setTemperature(response.data.main?.temp)
                setIcon(response.data.weather[0].icon)
                setWind(response.data.wind.speed)
            })
    }, [country]) 

    return (
        <div>
        <h3>Weather in {country.capital}</h3>
         <p>Temperature {temperature} Celsius</p> 
        <img src={`http://openweathermap.org/img/w/${icon}.png`}/>
        <p> wind {wind} m/s </p>   
        </div>
    )


  }
  
  export default Weather