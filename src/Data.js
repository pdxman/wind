import React, { useEffect, useState } from 'react'
import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

export default function Data() {
    const [weatherData, setWeatherData] = useState([])  
    const [loc, setLoc] = useState('new york')
    const [direction, setDirection] = useState('')
    const [name, setname] = useState('new york')
    
    useEffect(() => {
       getLoc()
    }, [])

    const getLoc = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}`)
        .then(response => {
            setWeatherData(response.data.wind)
            setname(response.data.name)
        })
    }

    const runDegreeConversion = () => {
        var conversionResult = degToCompass(weatherData.deg);
        setDirection(conversionResult)
    }

    const handleSearch = event => {
        event.preventDefault();
        event.persist();
        getLoc()
        runDegreeConversion()
    }

    const updateSearch = event => {
        setLoc(event.target.value)
    }

    function degToCompass(num){ 
        while( num < 0 ) num += 360 ;
        while( num >= 360 ) num -= 360 ; 
        var val = Math.round( (num -11.25 ) / 22.5 ) ;
        var arr = ["N","NNE","NE","ENE","E","ESE", "SE", 
              "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"] ;
        return arr[ Math.abs(val) ] ;
    }

    const circleStyle = {
        transition: 'all 1s ease',
        width:  '1em',
        height: '1em', 
        background: 'grey',
        borderRadius: '50%',
        position: 'absolute',
        top: weatherData.deg < 180 ? '50px' : '10px',
        left: '5px' }
       
    return(
        <div>
            <p>Wind Data for {name}</p>
            <form onSubmit={handleSearch}>
                <input 
                    type="text"
                    onChange={updateSearch}
                    placeholder="Search for Location"
                />
                <button type="submit">SEARCH</button> 
            </form> 
              <p><strong>Wind Speed:</strong> {weatherData.speed}</p>   
              <p><strong>Wind Direction(degrees):</strong> {weatherData.deg}</p> 
              <p><strong>Wind Gust:</strong> {weatherData.gust}</p>   
              <p><strong>Wind Direction(Compass):</strong> {direction}</p>
              <div className="circle-large">
                  <div
                    className="Rotate-circle" 
                    style={circleStyle}
                  >
                </div>
              </div>
        </div>
    )
}