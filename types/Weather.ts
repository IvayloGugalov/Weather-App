import { MouseEventHandler } from "react"

export type Weather = {
  temp: number,
  description: string,
  minTemp: number,
  maxTemp: number,
  realFeel: number,
  humidity: number,
  wind: Wind,
  icon: string,
  coordinates: {
    lon: string,
    lat: string
  }
  timezone: string
}

export type Wind = {
  speed: number,
  degrees: number
}

export const WEATHER_UNITS = {
  temperature: '°C',
  windSpeedKmH: 'km/h',
  humidity: '%'
}