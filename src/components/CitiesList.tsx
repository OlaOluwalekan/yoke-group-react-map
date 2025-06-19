import { useMemo } from 'react'
import type { CitiesListProps, CityProps } from '../types'
import { cities } from '../data/cities'
import { useAppContext } from '../context/AppContext'

const CitiesList = ({ searchValue = '', setSearchValue }: CitiesListProps) => {
  const { setSelectedCity, setSearchIsFocus } = useAppContext()

  const filteredCities = useMemo(() => {
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        city.country.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [searchValue])

  const handleCityClicked = (city: CityProps) => {
    setSelectedCity(city)
    setSearchIsFocus(false)
    setSearchValue(city.name)
  }

  return (
    <div className='bg-white rounded-lg max-h-[calc(100vh-8rem)] overflow-y-auto shadow-lg'>
      <ul>
        {filteredCities.map((city) => (
          <li
            key={city.id}
            className='cursor-pointer p-2 hover:bg-gray-100 rounded'
            onClick={() => handleCityClicked(city)}
          >
            {city.name}, {city.country}
          </li>
        ))}
        {filteredCities.length === 0 && (
          <li className='p-2 text-gray-500 flex justify-center'>
            No cities found
          </li>
        )}
      </ul>
      {/* {filteredCities.map((city) => (
        <div key={city.id} className='p-2 border-b border-gray-200'>
          {city.name}, {city.country}
        </div>
      ))} */}
    </div>
  )
}

export default CitiesList
