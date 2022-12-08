import { useEffect, useReducer } from "react"
import type { AirPollutionProps, Pollution } from '../types/Pollution'
import { ACTIONS } from '../types/fetchActions'

const URL = (lon: string, lat: string) =>
  `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`

function reducer(state:any, action:any) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { ...state, loading: true, pollution: null }
    case ACTIONS.GET_DATA:
      const pollution = action.payload.pollution.list[0]
      return {
        ...state,
        loading: false,
        pollution: {
          components: {
            co: pollution.components.co,
            no: pollution.components.no,
            no2: pollution.components.no2,
            o3: pollution.components.o3,
            so2: pollution.components.so2,
            pm2_5: pollution.components.pm2_5,
            pm10: pollution.components.pm10,
            nh3: pollution.components.mh3
          },
          date: parseInt(pollution.dt)
        },
        error: null
      }
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error.message, pollution: null }
    default:
      return state
  }
}

export default function useFetchAirPollution(lon: string, lat: string) : {pollution:Pollution, loading: boolean, error: string} {
  const [state, dispatch] = useReducer(reducer, { pollution: {}, loading: true })

  useEffect(() => {
    const get = async () => {
      dispatch({ type: ACTIONS.MAKE_REQUEST })
      const response = await fetch(URL(lon, lat))

      if (response.status === 404) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: 'Oops! Invalid Location ...' } })
      } else if (response.status !== 200) {
        const json = await response.json()
        dispatch({ type: ACTIONS.ERROR, payload: { error: json } })
      } else {
        const json = await response.json()
        dispatch({ type: ACTIONS.GET_DATA, payload: { pollution: json } })
      }
    }

    get()
  }, [lon, lat])

  return state
}
