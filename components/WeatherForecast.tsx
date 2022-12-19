import React, { useState } from 'react'

import useFetchCityWeather from '../hooks/useFetchCityWeather'
import { Weather } from '../types/Weather'
import WeatherForecastMain from './WeatherForecastMain'
import '../styles/initial.css'

const WeatherForecast = ({ search }: {search: string}) => {

  // const { data, loading, error } : {data: Weather | null, loading: boolean, error: string | null} = useFetchCityWeather(search)
  const [loading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<Weather | null>(null)

  const error = null

  setTimeout(() => {
    setIsLoading(false)
    setData({
      temp: parseInt('1.72'),
      description: 'overcast clouds',
      humidity: parseInt('86'),
      maxTemp: parseInt('2.8'),
      minTemp: parseInt('1.51'),
      realFeel: parseInt('-1.05'),
      wind: {
        speed: parseInt('2.57'),
        degrees: parseInt('90')
      },
      coordinates: {
        lon: 23.3242,
        lat: 42.6975
      },
      icon: 'Clouds',
      timezone: 10800
    })
  }, 1500)

  return (

    <>
      {loading && <img src='../assets/loading.svg'></img>}
      {data && (
        <div className='fade-in '>
          <WeatherForecastMain weather={data} city={search} error={error} />
        </div>
      )}
    </>
  )
}

export default WeatherForecast