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

    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: {
        q: `${lat},${lon}`,
        days: '2',
      },
      headers: {
        'x-rapidapi-key': 'b3c7b71d15msh4966d113aace904p1ca73bjsn8d3ee2075fef',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      },
    }

    try {
      const { data } = await axios.request(options)

      //   console.log('new data=>', data)

      const current: WeatherData = {
        temp: data.current.temp_c,
        description: data.current.condition.text,
        icon: data.current.condition.icon,
      }

      //   console.log('hello 1')

      const tomorrowDaily = data.forecast.forecastday[1]
      const tomorrow: WeatherData = {
        temp: tomorrowDaily.day.avgtemp_c,
        description: tomorrowDaily.day.condition.text,
        icon: tomorrowDaily.day.condition.icon,
      }

      //   console.log('hello2')

      //   console.log('new=>', current, tomorrow)

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
