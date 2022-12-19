import React, { useState } from 'react'
import { Weather, WEATHER_UNITS } from '../types/Weather'
import '../styles/initial.css'

import { RiWindyFill, RiErrorWarningLine, RiHeartAddFill, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri/index.js'
import { TbTemperatureMinus, TbTemperaturePlus} from 'react-icons/tb'
import { WiHumidity } from 'react-icons/wi'
import AirPollutionCard from './AirPollutionCard'
import icons from '../assets/icons/icons.jsx'
import calculateTime from '../helpers/getTime'
import { InvalidLocation } from '../types/errors'

const WeatherForecastMain = ({ weather, city, error }: {weather: Weather, city: string, error: string }) => {
  const [showPollution, setShowPollution] = useState<boolean>(false)

  const handleMouseClick = () => {
    const pollutionCard = document.getElementById('pollution-card')
    const showPollutionButton = document.getElementById('show-pollution-button')
    const dataContainer = document.getElementById('data-container')
    const weatherMoreInfo = document.getElementById('weather-more-info')

    if (!showPollution) {
      pollutionCard?.classList.remove('slide-out-left', 'opacity-0');
      pollutionCard?.classList.add('slide-in-left', 'opacity-100');
      showPollutionButton?.classList.add('-translate-y-5')
      dataContainer?.classList.add('translate-x-10')
      weatherMoreInfo?.classList.add('flex-col')
    } else {
      pollutionCard?.classList.add('slide-out-left', 'opacity-0');
      pollutionCard?.classList.remove('slide-in-left', 'opacity-100');
      showPollutionButton?.classList.remove('-translate-y-5')
      dataContainer?.classList.remove('translate-x-10')
      weatherMoreInfo?.classList.remove('flex-col')
    }

    setShowPollution(!showPollution)
  }

  return (
    <div
      className="
        forecast-container
        relative
        overflow-hidden
        w-foreCast
        pt-6
        px-6
        bg-white
        rounded-lg
        shadow-2xl
        border-b-2
        dark:bg-gray-800
        dark:border-gray-500"
    >
      {error && (
        <div className='flex flex-col justify-center items-center'>
          <p className='text-4xl font-semibold text-red-700'>
            <RiErrorWarningLine/>
          </p>
          <p className='text-2xl font-semibold text-gray-700'>
            {/* {error.header} */}
          </p>
          <p className='text-md text-gray-400'>
            {/* {error.description} */}
          </p>
        </div>
      )}
      <div className='flex flex-col justify-center items-center transition-all duration-500' id='data-container'>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-700 dark:text-white">{city}</h1>
        <div className='flex my-3 w-40 justify-evenly items-center'>
          <GetIcon weather={weather?.icon} timezone={weather?.timezone} />
          <div className='flex pt-5'>
            <h2 className="text-3xl text-temperature font-semibold tracking-tight dark:text-white">{weather?.temp}</h2>
            <span className='text-md dark:text-gray-200 text-temperature font-semibold'>°C</span>
          </div>
        </div>

        <div className='flex flex-col pt2 items-center'>
          <h3 className='text-xl dark:text-gray-200'>{weather?.description.charAt(0).toUpperCase()}{weather?.description.substring(1)}</h3>
          <div className='flex'>
            <h5 className='-mt-1 text-lg dark:text-gray-200'>Feels like {weather?.realFeel}</h5>
            <span className='text-xs dark:text-gray-200 -mt-0.5'>°C</span>
          </div>
        </div>

        <div className='w-full flex items-center justify-evenly pt-4 pb-8 px-10 ' id='weather-more-info'>
          {renderInformation(() =>
            <RiWindyFill className='text-3xl font-normal text-gray-600' />,
            `${weather?.wind?.speed}`,
            WEATHER_UNITS.windSpeedKmH
          )}
          {renderInformation(() =>
            <TbTemperatureMinus className='text-3xl font-normal text-blue-600' />,
            `${weather?.minTemp}`,
            WEATHER_UNITS.temperature
          )}
          {renderInformation(() =>
            <TbTemperaturePlus className='text-3xl font-normal text-red-600' />,
            `${weather?.maxTemp}`,
            WEATHER_UNITS.temperature
          )}
          {renderInformation(() =>
            <WiHumidity className='text-3xl font-normal text-blue-400' />,
            `${weather?.humidity}`,
            WEATHER_UNITS.humidity
          )}
        </div>
      </div>

      {weather?.coordinates.lon && weather?.coordinates.lat &&
        <button
          onClick={handleMouseClick}
          id='show-pollution-button'
          type="button"
          style={{zIndex: '10'}}
          className='flex top-5 absolute rounded-lg duration-500 opacity-80 hover:opacity-100 shadow-lg'
        >
          <RiHeartAddFill className='text-xl text-red-500' />
          <p className='pl-1 pt-0.5 text-sm '>Air Pollution</p>
          {showPollution
            ? ( <RiArrowLeftSLine className='text-2xl font-light text-gray-700 ' /> )
            : ( <RiArrowRightSLine className='text-2xl font-light text-gray-700 ' /> )
          }
        </button>
      }

      <AirPollutionCard lon={weather?.coordinates.lon} lat={weather?.coordinates.lat} />
    </div>
  )
}

export default WeatherForecastMain


function GetIcon({weather, timezone}: {weather: string | undefined, timezone: number}) {
  const timeOfDay = calculateTime(timezone)
  switch (weather) {
    case 'Clear':
      return timeOfDay === 'day'
        ? icons.clearDay
        : icons.clearNight
    case 'Rain':
      return timeOfDay === 'day'
        ? <img className='' src='../assets/icons/rainDay.png' alt='...' />
        : <img className='' src='../assets/icons/rainNight.png' alt='...' />
    case 'Snow':
      return icons.heavySnow
    case 'Clouds':
      return timeOfDay === 'day'
        ? icons.cloudyDay
        : icons.cloudyNight
    case 'Haze':
      return <img className='' src='../assets/icons/mist.png' alt='...' />
    default:
      return icons.clearDay
  }
}

const renderInformation = (Icon: React.FC, value: string, sign: string) => {
 return (
  <div className='flex items-center pb-1'>
    <Icon />
    <div className='pl-2 flex justify-center items-center '>
      <h3 className='text-xl font-normal text-gray-700 dark:text-gray-200' >{value}</h3>
      <span
        className='text-sm ml-0.5 mt-1'
        style={{marginBottom: sign === WEATHER_UNITS.temperature ? '14px' : '0' }}
      >
        {sign}
      </span>
    </div>
  </div>
 )
}