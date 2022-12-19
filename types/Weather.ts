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
    lon: number,
    lat: number
  }
  timezone: number
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

export type WeatherResponse = {
  coord: {
    lon: number,
    lat: number
  },
  weather: [
    {
      description: string,
      icon: string
    }
  ],
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  wind: {
    speed: number,
    deg: number
  },
  timezone: number,
  cod: number
}