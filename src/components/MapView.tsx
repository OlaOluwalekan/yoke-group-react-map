import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import WeatherContent from './WeatherContent'
import { createRoot, type Root } from 'react-dom/client'
import useWeather from '../hooks/useWeather2'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)
  const markerRef = useRef<mapboxgl.Marker | null>(null)
  const { selectedCity, setSearchIsFocus, weatherData, weatherResultStates } =
    useAppContext()
  const popupRoot = useRef<Root>(null)

  useWeather(selectedCity)

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current) return
    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      // style: 'mapbox://styles/mapbox/light-v10',
      center: [6, 3], // initial center
      zoom: 1.5,
    })

    // clean up on unmount
    return () => mapInstance.current?.remove()
  }, [])

  // When `city` is selected, move map and place marker
  useEffect(() => {
    if (!mapInstance.current || !selectedCity) return

    const { lon, lat } = selectedCity
    mapInstance.current.flyTo({
      center: [lon, lat],
      zoom: 8,
    })

    const popupNode = document.createElement('div')
    popupRoot.current = createRoot(popupNode)

    const popup = new mapboxgl.Popup({
      closeOnClick: false,
      closeButton: false,
      className: 'my-custom-popup',
    })
      .setLngLat([lon, lat])
      .setDOMContent(popupNode)

    popupRoot.current.render(
      <WeatherContent
        city={selectedCity}
        weatherData={weatherData}
        weatherState={weatherResultStates}
      />
    )

    // Remove previous marker if exists
    markerRef.current?.remove()

    const marker = new mapboxgl.Marker()
      .setLngLat([lon, lat])
      .setPopup(popup) // Add popup to marker
      .addTo(mapInstance.current)
    marker.getElement().style.cursor = 'pointer'

    // Store this marker so we can remove it next time
    markerRef.current = marker
  }, [selectedCity])

  useEffect(() => {
    if (popupRoot.current && selectedCity) {
      popupRoot.current.render(
        // <AppProvider>
        <WeatherContent
          city={selectedCity}
          weatherData={weatherData}
          weatherState={weatherResultStates}
        />
        // </AppProvider>
      )
    }
  }, [weatherData, weatherResultStates])

  return (
    <div
      className='flex-1 h-screen'
      ref={mapContainer}
      onClick={() => setSearchIsFocus(false)}
    ></div>
  )
}

export default MapView
