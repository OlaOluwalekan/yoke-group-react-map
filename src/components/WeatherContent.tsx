import type { CityProps, WeatherResult, WeatherResultState } from '../types'

const WeatherContent = ({
  city,
  weatherData,
  weatherState,
}: {
  city: CityProps
  weatherData: WeatherResult | null
  weatherState: WeatherResultState
}) => {
  return (
    <div>
      <div className='text-center items-center mb-2'>
        <h2 className='text-base font-semibold'>
          {city.name}, {city.country}
        </h2>
      </div>

      {weatherState.loading ? (
        <div>Please Wait...</div>
      ) : weatherState.error ? (
        <div>{weatherState.error}</div>
      ) : (
        <div className='flex justify-between gap-3'>
          <div className='flex flex-col items-center'>
            <h3 className='font-medium'>Current</h3>
            <div className='flex flex-col items-center justify-center'>
              <img
                src={weatherData?.current?.icon}
                alt='icon'
                className='w-8 aspect-square'
              />
              <div className='text-xs text-center'>
                <p>{weatherData?.current?.temp} °C</p>
                <p className='capitalize'>
                  {weatherData?.current?.description}
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center'>
            <h3 className='font-medium'>Tomorrow</h3>
            <div className='flex flex-col items-center'>
              <img
                src={weatherData?.tomorrow?.icon}
                alt='icon'
                className='w-8 aspect-square'
              />
              <div className='text-xs text-center'>
                <p>{weatherData?.tomorrow?.temp} °C</p>
                <p className='capitalize'>
                  {weatherData?.tomorrow?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherContent
