import React, { useEffect, useState } from 'react'
import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

export default function Data() {
    const [weatherData, setWeatherData] = useState([])  
    const [loc, setLoc] = useState('new york')
    const [direction, setDirection] = useState('')
    const [name, setname] = useState('new york')
    const [locFound, setLocFound] = useState(true)
   
    useEffect(() => {
       getLoc()
       
    }, [locFound])

    const getLoc = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}`)
        .then(response => {
            setWeatherData(response.data.wind)
            setname(response.data.name)
        })
        
        .catch(err => {
            if(err.response.data.cod === '404'){
                setLocFound(false)
                console.log('its a 404 ', locFound)
            } else if(err.request) {
                console.log('error request:', err)
            } else {
                console.log('nothing', err)        
            }
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

    const windDir = direction
    
    // let top;
    // let left; 
    //     switch(windDir) {
    //         case "ESE" : 
    //             top = '47px'
    //             left = '46px'   
    //         break;
    //         case "ENE" : 
    //             top = '4px'
    //             left = '46px'   
    //         break;
    //         case "WSW": 
    //             top = '36px'
    //             left = '-4px'
    //         break;
    //         case "SSW": 
    //             top = '54px'
    //             left = '16px'
    //         break;
    //         case "NNW": 
    //             top = '2.5px'
    //         break;
    //         case "NNE": 
    //             top = '-4px'
    //             left = '36px'
    //         break;
    //         case "NW" : 
    //             top = '0px'
    //             left = '13px'    
    //         break;
    //         case "SW": 
    //             top = '46px'
    //             left ='5px'
    //         break;
    //         case "SE": 
    //             top = '48px'
    //             left = '48px'
    //         break;
    //         case "NE": 
    //             top = '1px'
    //             left = '44px'
    //         break;
    //         case "S": 
    //             top = '50px'
    //             left = '23px'
    //         break;
    //         case "N": 
    //             top = '-6.5px'
    //             left = '23px'
    //         break;
    //         case "E": 
    //             top = '23px'
    //             left = '54px'
    //         break;
    //         case "W": 
    //             // transform = 'translate(23px, -7.5px)'
    //             top = '23px'
    //             left = '-7.5px'
    //         break;
    //         default:
    //             console.log('default')
    //     }

     let transform;
        switch(windDir) {
            case "ESE" : 
                transform = 'translate(47px, 46px)'  
            break;
            case "ENE" : 
                transform = 'translate(4px, 46px)' 
            break;
            case "WSW": 
                transform = 'translate(36px, -4px)' 
            break;
            case "SSW": 
                transform = 'translate(54px, 16px)' 
            break;
            case "NNW": 
                transform = 'translateX(2.5px)' 
            break;
            case "NNE": 
                transform = 'translate(-4px, 36px)' 
            break;
            case "NW" : 
                  transform = 'translate(0px, 13px)'  
            break;
            case "SW": 
                transform = 'translate(46px, 5px)' 
            break;
            case "SE": 
                transform = 'translate(48px, 48px)' 
            break;
            case "NE": 
               transform = 'translate(47px, 46px)' 
            break;
            case "S": 
                transform = 'translate(50px, 23px)' 
            break;
            case "N": 
                transform = 'translate(-6.5px, 23px)' 
            break;
            case "E": 
                transform = 'translate(23px, 54px)' 
            break;
            case "W": 
                transform = 'translate(23px, -7.5px)'
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
        transform: transform, 
        transformOrigin: '50px'
        // top:  top ,
        // left: left
    }
       
    return(<div>
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
               </div> 
               <div>
                    <p>{!locFound ? 'loc was not found' : ''}</p>
                    <p><strong>Wind Speed:</strong> {weatherData.speed}</p>   
                    <p><strong>Wind Direction(degrees):</strong> {weatherData.deg}</p> 
                    <p><strong>Wind Gust:</strong> {weatherData.gust}</p>   
                    <p><strong>Wind Direction(Compass):</strong> {direction}</p>
                </div>    
              <div className="circle-large"><div className="Rotate-circle"  style={circleStyle} ></div></div>
        </div>)
}