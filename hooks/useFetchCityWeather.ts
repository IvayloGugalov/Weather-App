import { useEffect, useReducer } from "react"
import type { Weather } from '../types/Weather'
import { ACTIONS } from '../types/fetchActions'

const URL = (city:string) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`

function reducer(state:any, action:any) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { ...state, loading: true, weather: null }
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        weather: {
          temp: parseInt(action.payload.weather.main.temp),
          description: action.payload.weather.weather[0].description,
          minTemp: parseInt(action.payload.weather.main.temp_min),
          maxTemp: parseInt(action.payload.weather.main.temp_max),
          realFeel: parseInt(action.payload.weather.main.feels_like),
          humidity: parseInt(action.payload.weather.main.humidity),
          wind: {
            speed: parseInt(action.payload.weather.wind.speed),
            degrees: parseInt(action.payload.weather.wind.deg)
          },
          icon: action.payload.weather.weather[0].main,
          timezone: action.payload.weather.timezone
        },
        error: null
      }
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error, weather: null }
    default:
      return state
  }
}

export default function useFetchCityWeather(city:string) : {weather:Weather, loading: boolean, error: string} {
  const [state, dispatch] = useReducer(reducer, { weather: {}, loading: true })

  useEffect(() => {
    const get = async () => {
      dispatch({ type: ACTIONS.MAKE_REQUEST })
      const response = await fetch(URL(city))

      if (response.status === 404) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: 'Oops! Invalid Location ...' } })
      } else if (response.status !== 200) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: response.body } })
      } else {
        const json = await response.json()
        dispatch({ type: ACTIONS.GET_DATA, payload: { weather: json } })
      }
    }

    get()
  }, [city])

  return state
}
