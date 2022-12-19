import React from 'react'
import { Weather } from '../../../types/Weather'
import WeatherForecastMain from '../../../components/WeatherForecastMain'
import '../../../styles/initial.css'
import { Layout } from '../Layout'

export { Page }

function Page({ city, weather, error } : {city: string, weather:Weather, error: string}) {

  return (
    <Layout>
      <div className='fade-in '>
        <WeatherForecastMain weather={weather} city={city} error={error} />
      </div>
    </Layout>
  )
}

