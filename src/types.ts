export interface CityProps {
  id: number
  name: string
  country: string
  lat: number
  lon: number
}

export interface SearchbarProps {
  value: string
  onChange: (v: string) => void
}

export interface AppContextType {
  searchIsFocus: boolean
  setSearchIsFocus: (v: boolean) => void
  selectedCity: CityProps | null
  setSelectedCity: (city: CityProps | null) => void
  weatherData: WeatherResult | null
  setWeatherData: (data: WeatherResult | null) => void
  weatherResultStates: WeatherResultState
  setWeatherResultStates: (state: WeatherResultState) => void
}

export interface CitiesListProps {
  searchValue?: string
  setSearchValue: (value: string) => void
}

export interface WeatherData {
  temp: number
  description: string
  icon: string
}

export interface WeatherResult {
  current: WeatherData | null
  tomorrow: WeatherData | null
}

export interface WeatherResultState {
  loading: boolean
  error: string | null
}
