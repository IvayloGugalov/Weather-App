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

export type AirPollutionResponse = {
  coord:{
    lon: number,
    lat: number
  },
  list: [
    {
      components:{
        co: number,
        no: number,
        no2: number,
        o3: number,
        so2: number,
        pm2_5: number,
        pm10: number,
        nh3: number
      },
      dt: number
    }
  ]
}