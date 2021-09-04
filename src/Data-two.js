import React, { useEffect, useState } from 'react'
import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

const errorStyle = {
  color: 'red',
}

export default function Data() {
  const [weatherData, setWeatherData] = useState([])
  const [loc, setLoc] = useState('new york')
  const [direction, setDirection] = useState('')
  const [name, setname] = useState('new york')
  const [error, setError] = useState(false)

  useEffect(() => {
    getLoc()
  }, [])

  const getLoc = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}`
      )
      .then((response) => {
        setWeatherData(response.data.wind)
        setname(response.data.name)
      })
  }

  const runDegreeConversion = () => {
    var conversionResult = degToCompass(weatherData.deg)
    setDirection(conversionResult)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    event.persist()
    getLoc()
    runDegreeConversion()
    // setWindPosition()
  }

  const windDir = direction
  //const windDir = 0

  const [pixels, setPixels] = useState('')

  switch (windDir) {
    case 'NW':
      console.log('NW')
      setPixels('20px')
      break
    case 'SW':
      console.log('SW')
      setPixels('20px')
      break
    case 'SE':
      console.log('SE')
      setPixels('20px')
      break
    case 'NE':
      console.log('NE')
      break
    case 'S':
      console.log('S')
      break
    case 'N':
      console.log('N')
      break
    case 'E':
      console.log('E')
      setPixels('20px')
      //   return pixels
      break
    case 'W':
      console.log('W')
      break
    default:
      console.log('default')
  }

  const updateSearch = (event) => {
    setLoc(event.target.value)
  }

  function degToCompass(num) {
    while (num < 0) num += 360
    while (num >= 360) num -= 360
    var val = Math.round((num - 11.25) / 22.5)
    var arr = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ]
    return arr[Math.abs(val)]
  }

  const getDegreesForCompass = () => {
    return '300px'
  }

  function lalalala() {
    return '40px'
  }

  const circleStyle = {
    transition: 'all 1s ease',
    width: '1em',
    height: '1em',
    background: 'grey',
    borderRadius: '50%',
    position: 'absolute',
    // top: weatherData.deg < 180 ? '50px' : '10px',
    top: pixels,
    left: '5px',
  }

  return (
    <div>
      <p>Wind Data for {name}</p>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          onChange={updateSearch}
          placeholder='Search for Location'
        />
        <button type='submit'>SEARCH</button>
      </form>
      {error ? (
        <p style={{ color: 'red' }}>Error: Message Whatever</p>
      ) : undefined}
      <p>
        <strong>Wind Speed:</strong> {weatherData.speed}
      </p>
      <p>
        <strong>Wind Direction(degrees):</strong> {weatherData.deg}
      </p>
      <p>
        <strong>Wind Gust:</strong> {weatherData.gust}
      </p>
      <p>
        <strong>Wind Direction(Compass):</strong> {direction}
      </p>
      <div className='circle-large'>
        <div className='Rotate-circle' style={circleStyle}></div>
      </div>
    </div>
  )
}