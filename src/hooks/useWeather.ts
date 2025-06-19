import { useEffect } from 'react'
import type { CityProps, WeatherData } from '../types'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'

const useWeather = (city: CityProps | null) => {
  const {
    weatherData,
    setWeatherData,
    weatherResultStates,
    setWeatherResultStates,
  } = useAppContext()

  const fetchWeather = async (lat: number, lon: number) => {
    setWeatherResultStates({ loading: true, error: null })
    try {
      const key = import.meta.env.VITE_OPENWEATHER_KEY
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${key}`
      const { data } = await axios.get(url)

      const current: WeatherData = {
        temp: data.current.temp,
        description: data.current.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
      }

      const tomorrowDaily = data.daily[1]
      const tomorrow: WeatherData = {
        temp: tomorrowDaily.temp.day,
        description: tomorrowDaily.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${tomorrowDaily.weather[0].icon}@2x.png`,
      }

      setWeatherData({ current, tomorrow })
    } catch (error: any) {
      setWeatherResultStates({
        loading: false,
        error: error.message || 'Failed to fetch weather data',
      })
      //   setError(error.message || 'Failed to fetch weather data')
    } finally {
      setWeatherResultStates({ ...weatherResultStates, loading: false })
    }
  }

  useEffect(() => {
    if (!city) return
    fetchWeather(city.lat, city.lon)
  }, [city])

  return {
    weatherData,
    weatherResultStates,
    // refetch: () => fetchWeather(city.lat, city.lon),
  }
}

export default useWeather
