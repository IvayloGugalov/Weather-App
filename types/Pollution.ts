export type Pollution = {
  components: PollutionComponents,
  date: number
}

export type PollutionComponents = {
  co: string,
  no: string,
  no2: string,
  o3: string,
  so2: string,
  pm2_5: string,
  pm10: string,
  nh3: string,
}

export type AirPollutionProps = {
  coordinates: {
    lat: string,
    lon: string
  }
}

export const POLLUTION_UNITS = {
  microGramsPerSquareMeter: 'µg/m³'
}