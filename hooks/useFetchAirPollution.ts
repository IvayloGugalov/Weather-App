import { Dispatch, useEffect, useReducer } from "react"
import type { AirPollutionResponse, Pollution } from '../types/Pollution'
import { Action, State, Types } from "../types/generics"
import { sleep } from "../helpers/simulateLoad"

const URL = (lon: number, lat: number) =>
  `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`

function reducer(state: State<Pollution>, action:Action<AirPollutionResponse>) {
  switch (action.type) {
    case Types.MAKE_REQUEST:
      return { ...state, loading: true, data: null }
    case Types.GET_DATA:
      const pollution = action.payload.data?.list[0]
      return {
        ...state,
        loading: false,
        data: {
          components: {
            co: pollution?.components.co,
            no: pollution?.components.no,
            no2: pollution?.components.no2,
            o3: pollution?.components.o3,
            so2: pollution?.components.so2,
            pm2_5: pollution?.components.pm2_5,
            pm10: pollution?.components.pm10,
            nh3: pollution?.components.nh3
          },
          date: pollution?.dt
        },
        error: null
      }
    case Types.ERROR:
      return { ...state, loading: false, error: action.payload.error, data: null }
    default:
      return state
  }
}

const initialState: State<Pollution> = {
  error: null,
  loading: false,
  data: null
}
export default function useFetchAirPollution(lon: number, lat: number) : State<Pollution> {
  const [state, dispatch]: [State<Pollution>, Dispatch<Action<AirPollutionResponse>>] =
    useReducer(reducer, initialState)

  useEffect(() => {
    const get = async () => {
      dispatch({ type: Types.MAKE_REQUEST, payload: {error: null, data: null, loading: true  } })
      const response = await fetch(URL(lon, lat))

      if (response.status === 404) {
        dispatch({
          type: Types.ERROR,
          payload: { error: 'Oops! Invalid Location ...', data: null, loading: false }
        })
      } else if (response.status !== 200) {
        dispatch({
          type: Types.ERROR,
          payload: { error: (await response.json()).message, data: null, loading: false  }
        })
      } else {
        const json = await response.json()
        await sleep(2000)
        dispatch({
          type: Types.GET_DATA,
          payload: { data: json, error: null, loading: false }
        })
      }
    }

    get()
  }, [lon, lat])

  return state
}
