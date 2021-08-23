import React, { useEffect, useState } from 'react'
import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

export default function Data() {
    const [weatherData, setWeatherData] = useState([])  
    const [loc, setLoc] = useState('new york')
    const [direction, setDirection] = useState('')
    
    useEffect(() => {
       getLoc()
       
    }, [])

    const getLoc = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}`)
        .then(response => {
            console.log(response.data.wind)
            setWeatherData(response.data.wind)
        })
    }

    const runDegreeConversion = () => {
        var conversionResult = degToCompass(weatherData.deg);
        console.log("wind direction ", conversionResult)
        setDirection(conversionResult)
    }

    const handleSearch = event => {
        event.preventDefault();
        getLoc()
        runDegreeConversion()
        //fires get loc on form submit- undefined
    }

    const updateSearch = event => {
        setLoc(event.target.value)
        //sets loc state from input 
    }

    function degToCompass(num){ 
        while( num < 0 ) num += 360 ;
        while( num >= 360 ) num -= 360 ; 
        var val = Math.round( (num -11.25 ) / 22.5 ) ;
        var arr = ["N","NNE","NE","ENE","E","ESE", "SE", 
              "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"] ;
        return arr[ Math.abs(val) ] ;
    }

    return(
        <div>
              <p>Wind Data for {loc}</p>
              <form onSubmit={handleSearch}>
                <input 
                    type="text"
                    onChange={updateSearch}
                />
                <button type="submit">Search</button> 
              </form>  
              <p><strong>Current Search Location:</strong> {loc}</p>
              <p><strong>Wind Speed:</strong> {weatherData.speed}</p>   
              <p><strong>Wind Gust:</strong> {weatherData.gust}</p>   
              <p><strong>Wind Direction(degrees):</strong> {weatherData.deg}</p>   
              {/* <button onClick={runDegreeConversion}>Convert to Wind Direction</button> */}
              <p><strong>Wind Direction(Compass):</strong> {direction}</p>
        </div>
    )
}