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
        // setWindPosition()
    }

    const windDir = direction
    //const windDir = 0
   
    let top;
        switch(windDir) {
            case "NW" : 
                console.log('NW')
                top = '130px'    
            break;
            case "SW": 
                console.log('SW')
                top = '120px'
            break;
            case "SE": 
                console.log('SE')
                top = '110px'
            break;
            case "NE": 
                console.log('NE')
                top = '10px'
            break;
            case "S": 
                console.log('S')
                top = '-110px'
            break;
            case "N": 
                console.log('N')
                top = '-120px'
            break;
            case "E": 
                console.log('E')
                top = '-130px'
            break;
            case "W": 
                console.log('W')
                top = '-140px'
            break;
            default:
                console.log('default')
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
        //top: weatherData.deg < 180 ? '50px' : '10px',
        top:  top ,
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