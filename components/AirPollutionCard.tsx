import React, { useState } from 'react'
import { AirPollutionProps, Pollution, PollutionComponents, POLLUTION_UNITS } from '../types/Pollution'

import { format } from 'date-fns'

import useFetchAirPollution from '../hooks/useFetchAirPollution'

const renderPollutionStat = (pollutionType: string, value: string) => {
  const statColor = calculateStatColor(pollutionType, value)
  const valueTextStyle = `text-md leading-none ${statColor}`

  return (
    <div className='flex justify-start items-center pt-2 '>
      <div className='flex flex-col px-2 py-1 border rounded-lg w-28 border-gray-300  '>
        <h3 className='text-xs' >{pollutionType.toUpperCase().replace('_', '.')}</h3>
        <div className='flex'>
          <h1 className={valueTextStyle}>{value}</h1>
          <h1 className='text-md leading-none pl-1'>{POLLUTION_UNITS.microGramsPerSquareMeter}</h1>
        </div>
      </div>
    </div>
  )
}

function calculateStatColor(pollutionType: string, value: string) {
  const valueNumber = parseInt(value)
  if (pollutionType === 'pm10') {
    return valueNumber <= 25
      ? 'text-emerald-500'
      : valueNumber <= 50 && valueNumber < 90
        ? 'text-orange-500'
        : 'text-rose-500'
  } else if (pollutionType === 'o3') {
    return valueNumber <= 60
      ? 'text-emerald-500'
      : valueNumber <= 120 && valueNumber < 180
        ? 'text-orange-500'
        : 'text-rose-500'
  } else if (pollutionType === 'no2') {
    return valueNumber <= 50
      ? 'text-emerald-500'
      : valueNumber <= 100 && valueNumber < 200
        ? 'text-orange-500'
        : 'text-rose-500'
  } else if (pollutionType === 'co') {
    return valueNumber <= 1000
      ? 'text-emerald-500'
      : 'text-orange-500'
  } else if (pollutionType === 'so2') {
    return valueNumber <= 40
      ? 'text-emerald-500'
      : 'text-orange-500'
  } else if (pollutionType === 'nh3') {
    return valueNumber <= 270
      ? 'text-emerald-500'
      : 'text-orange-500'
  } else if (pollutionType === 'pm2_5') {
    return valueNumber <= 15
      ? 'text-emerald-500'
      : valueNumber <= 30 && valueNumber < 55
        ? 'text-orange-500'
        : 'text-rose-500'
  } else if (pollutionType === 'no') {
    return valueNumber <= 25
      ? 'text-emerald-500'
      : 'text-orange-500'
  }
}

const AirPollutionCard = ({lon, lat}: {lon: number, lat: number}) => {

  if (!lon || !lat) {
    return <></>
  }

  // const { data, loading, error } : {data:Pollution | null, loading: boolean, error: string | null} = useFetchAirPollution(lon, lat)
  const [loading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<Pollution | null>(null)

  const error = null

  setTimeout(() => {
    setIsLoading(false)
    setData({
      components: {
        co:    '587.46',
        no:    '0.67',
        no2:   '30.5',
        o3:    '45.78',
        so2:   '2.03',
        pm2_5: '27.63',
        pm10:  '52.17',
        nh3:   '1.31'
      },
      date: 1670246640
    })
  }, 2500)

  return (
    <div className='absolute top-4 left-0 flex z-5 max-w-md' >

    <div
      id='pollution-card'
      role="tooltip"
      className="
        opacity-0
        min-w-pollutionCard
        min-h-pollutionCard
        left-0
        mt-2
        text-sm
        text-gray-500
        transition-opacity
        duration-300
        border
        border-gray-400
        rounded-xl
        shadow-xl
        dark:text-gray-400
        dark:bg-gray-800
        dark:border-gray-600"
      >
        {loading && (<img className='z-10 w-full h-full ml-14' src='../assets/loading.svg'></img>)}
        {error && <p>{error}</p>}
        {data && (
          <div
            className="
              p-2
              flex
              flex-col
              justify-start
              items-center"
          >
            <h2 className='pt-1 text-base font-semibold leading-none text-gray-700 dark:text-white '>
              Polution
            </h2>
            {data?.date && <h3 className='-ml-36 text-xs pt-1 text-gray-700'>{format(new Date(data?.date * 1000), 'p, MMM dd')}</h3> }

            <div className='grid grid-cols-2 gap-x-4 px-1'>
              {Object.keys(data.components).map(component => (
                <div key={component}>
                  {renderPollutionStat(component, data.components[component as keyof PollutionComponents])}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default AirPollutionCard