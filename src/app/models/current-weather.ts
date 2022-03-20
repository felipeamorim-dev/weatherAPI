export interface CurrentWeather {
  name: string,
  weather: {
    id: number,
    main: string,
    description: string,
    icon: string
  },
  main: {
    temp: number,
    temp_min: number,
    temp_max: number,
    humidity: number
  },
  wind: {
    speed: number,
    deg: number
  }
}
