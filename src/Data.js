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
    //    console.log("loc inside useEffect: ", loc)
    }, [])

    const getLoc = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}`)
        .then(response => {
            // console.log(response.data.wind)
            setWeatherData(response.data.wind)
            setname(response.data.name)
            // console.log("the name: ", {name})
        })
    }

    const runDegreeConversion = () => {
        var conversionResult = degToCompass(weatherData.deg);
        //console.log("wind direction ", conversionResult)
        setDirection(conversionResult)
    }

    const handleSearch = event => {
        event.preventDefault();
        event.persist();
        getLoc()
        runDegreeConversion()
        //fires get loc on form submit- undefined
        // notes
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

    const windSpeed = false
    const windGust = weatherData.deg

    // const updateDirection = () => {
    //     console.log('updated direction')
    // }

    if(weatherData.deg < 180) {
        console.log(weatherData.deg, 'less than 180')
    } else {
        console.log(weatherData.deg, 'more than 180')
    }

    return(
        <div>
              <p>Wind Data for {name}</p>
              <form onSubmit={handleSearch}>
                <input 
                    type="text"
                    onChange={updateSearch}
                />
                <button type="submit">Search</button> 
              </form>  
              <p><strong>Current Search Location:</strong> {name}</p>
              <p><strong>Wind Speed:</strong> {weatherData.speed}</p>   
              <p><strong>Wind Direction(degrees):</strong> {weatherData.deg}</p> 
              <p><strong>Wind Gust:</strong> {weatherData.gust}</p>   
              {/* <button onClick={runDegreeConversion}>Convert to Wind Direction</button> */}
              <p><strong>Wind Direction(Compass):</strong> {direction}</p>
              <div style={{
                  width:  '4em',
                  height: '4em', 
                  background: 'green',
                  borderRadius: '50%',
                  margin: '5em auto',
                  position: 'relative'
              }}>
                  <div
                    className="Rotate-circle"
                    style={{
                        animation: 'app-logo-spin infinite spin ease',
                        width:  '1em',
                        height: '1em', 
                        background: 'red',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: weatherData.deg < 180 ? '50px' : '10px',
                        left: '5px'
                        
                        // transform: windSpeed ? 'rotate(0deg) translateX(36px) rotate(0deg)' : 'rotate(-45deg)' 
                    }}>
                </div>
              </div>
        </div>
    )
}