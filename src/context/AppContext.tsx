import { createContext, useContext, useState, type ReactNode } from 'react'
import type {
  AppContextType,
  CityProps,
  WeatherResult,
  WeatherResultState,
} from '../types'

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchIsFocus, setSearchIsFocus] = useState(false)
  const [selectedCity, setSelectedCity] = useState<CityProps | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherResult | null>({
    current: null,
    tomorrow: null,
  })
  const [weatherResultStates, setWeatherResultStates] =
    useState<WeatherResultState>({ loading: false, error: null })

  return (
    <AppContext.Provider
      value={{
        searchIsFocus,
        setSearchIsFocus,
        selectedCity,
        setSelectedCity,
        weatherData,
        setWeatherData,
        weatherResultStates,
        setWeatherResultStates,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
