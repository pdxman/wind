import React, { useState, useEffect } from 'react'
import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

export default function Directiontest () {
    const [loc, setLoc] = useState('miami')
    const [weatherData, setWeatherData] = useState([])
    const [name, setName] = useState('Duluth')
    const [direction, setDirection] = useState('dir')

    useEffect(() => {
        getLoc() 
    
    }, [])

    const getLoc = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}`)
        .then(response => {
            setWeatherData(response.data.wind)
            setName(response.data.name)
            
        
        })

    }

    const updateSearch = event => {
        setLoc(event.target.value)
    }

    const handleSearch = event => {
        event.preventDefault();
        event.persist();
        getLoc()
        runDegreeConversion()
        
     }

     const runDegreeConversion = () => {
        function degToCompass(num){ 
            while( num < 0 ) num += 360 ;
            while( num >= 360 ) num -= 360 ; 
            var val = Math.round( (num -11.25 ) / 22.5 ) ;
            var arr = ["NNE","NE","ENE","E","ESE", "SE", 
                  "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW", "N",] ;
            return arr[ Math.abs(val) ] ;
        }

        var conversionResult = degToCompass(weatherData.deg);
        setDirection(conversionResult)
    }

    return(
        <div>
            <p>{name}</p>
            <p>test data: {weatherData.deg}</p>
            <p><strong>Wind Direction(Compass):</strong> {direction}</p>
            <form onSubmit={handleSearch}>
                <input 
                    type="text"
                    onChange={updateSearch}
                    placeholder="Search for Location"
                />
                <button type="submit">SEARCH</button> 
            </form> 
        </div>
       
    )
}
