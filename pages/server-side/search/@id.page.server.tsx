import fetch from 'node-fetch'
import { PageContextBuiltIn } from "vite-plugin-ssr"
import { InvalidLocation } from '../../../types/errors'
import { WeatherResponse } from '../../../types/Weather'

export { onBeforeRender }

const URL = (city:string) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`


async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const city = pageContext.urlPathname.split(/[/#]/).at(-1) as string

  // return await fetchWeather(city)

  return fetchWeatherHardCoded(city)
}

function fetchWeatherHardCoded(city: string) {
  return {
    pageContext: {
      pageProps: {
        city,
        weather: {
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
            lon: '23.3242',
            lat: '42.6975'
          },
          icon: 'Clouds',
          timezone: 7200
        }
      },
      // The page's <title>
      documentProps: { title: getTitle(200, city) }
    }
  }
}

async function fetchWeather(city: string) {
  const response = await fetch(URL(city))
  if (response.status === 404) {
    return {
      pageContext: {
        pageProps: {
          error: InvalidLocation
        }
      }
    }
  } else if (response.status !== 200) {
    return {
      pageContext: {
        pageProps: {
          error: response.statusText
        }
      }
    }
  } else {
    const json = ((await response.json()) as WeatherResponse)
    return {
      pageContext: {
        pageProps: {
          city: city,
          weather: {
            temp: Math.round(json.main.temp),
            description: json.weather[0].description,
            minTemp: Math.round(json.main.temp_min),
            maxTemp: Math.round(json.main.temp_max),
            realFeel: Math.round(json.main.feels_like),
            humidity: json.main.humidity,
            wind: {
              speed: json.wind.speed.toFixed(1),
              degrees: json.wind.deg
            },
            coordinates: json.coord,
            icon: json.weather[0].icon,
            timezone: json.timezone
          }
        },
        documentProps: { title: getTitle(response.status, city) }
      }
    }
  }
}

function getTitle(response: number, city: string): string {
  const title = response < 300
    ? `${city} weather`
    : 'Error'
  return title
}
