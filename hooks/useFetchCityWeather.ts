import { Dispatch, useEffect, useReducer } from "react"
import type { Weather, WeatherResponse } from '../types/Weather'
import { Action, State, Types } from '../types/generics'
import { sleep } from "../helpers/simulateLoad"

const URL = (city:string) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`

function reducer(state: State<Weather>, action: Action<WeatherResponse>) {
  switch (action.type) {
    case Types.MAKE_REQUEST:
      return { ...state, loading: true, data: null }
    case Types.GET_DATA:
      const weather = action.payload.data;
      if (!weather) {
        return { ...state, loading: false }
      }
      return {
        ...state,
        loading: false,
        data: {
          temp: Math.round(weather.main.temp),
          description: weather.weather[0].description,
          minTemp: Math.round(weather.main.temp_min),
          maxTemp: Math.round(weather.main.temp_max),
          realFeel: Math.round(weather.main.feels_like),
          humidity: weather.main.humidity,
          wind: {
            speed: weather.wind.speed.toFixed(1),
            degrees: weather.wind.deg
          },
          icon: weather.weather[0].icon,
          coordinates: weather.coord,
          timezone: weather.timezone
        },
        error: null
      }
    case Types.ERROR:
      return { ...state, loading: false, error: action.payload.error, data: null }
    default:
      return state
  }
}

const initialState: State<Weather> = {
  error: null,
  loading: false,
  data: null
}

export default function useFetchCityWeather(city:string) : State<Weather> {
  const [state, dispatch]: [State<Weather>, Dispatch<Action<WeatherResponse>>] =
    useReducer(reducer, initialState)

  useEffect(() => {
    const get = async () => {
      dispatch({ type: Types.MAKE_REQUEST, payload: {error: null, data: null, loading: true  } })
      const response = await fetch(URL(city))

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
  }, [city])

  return state
}
