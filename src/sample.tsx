// import React, { useEffect, useRef } from 'react'
// import mapboxgl from 'mapbox-gl'
// import { createRoot } from 'react-dom/client'
// import { City } from '../data/cities'
// import WeatherPopupContent from './WeatherPopupContent'

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

// interface MapViewProps {
//   city: City | null
// }

// const MapView: React.FC<MapViewProps> = ({ city }) => {
//   const mapContainer = useRef<HTMLDivElement>(null)
//   const mapRef = useRef<mapboxgl.Map>()
//   const markerRef = useRef<mapboxgl.Marker>()

//   useEffect(() => {
//     if (!mapContainer.current) return
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/light-v10',
//       center: [0, 20],
//       zoom: 1.5,
//     })
//     return () => mapRef.current?.remove()
//   }, [])

//   useEffect(() => {
//     if (!city || !mapRef.current) return

//     const { lon, lat } = city
//     mapRef.current.flyTo({ center: [lon, lat], zoom: 8 })
//     markerRef.current?.remove()

//     const marker = new mapboxgl.Marker({ color: '#0088ff' })
//       .setLngLat([lon, lat])
//       .addTo(mapRef.current)

//     // Create a container div for the React popup
//     const popupNode = document.createElement('div')

//     // Optionally show a loading message while fetching
//     popupNode.innerText = 'Loading weather…'

//     const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupNode)
//     marker.setPopup(popup).togglePopup()

//     // Fetch weather as before
//     ;(async () => {
//       const key = import.meta.env.VITE_OPENWEATHER_KEY
//       const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${key}`
//       const res = await fetch(url)
//       const json = await res.json()

//       const today = {
//         temp: Math.round(json.current.temp),
//         desc: json.current.weather[0].description,
//         icon: `https://openweathermap.org/img/wn/${json.current.weather[0].icon}@2x.png`,
//       }
//       const tomorrowDaily = json.daily[1]
//       const tomorrow = {
//         temp: Math.round(tomorrowDaily.temp.day),
//         desc: tomorrowDaily.weather[0].description,
//         icon: `https://openweathermap.org/img/wn/${tomorrowDaily.weather[0].icon}@2x.png`,
//       }

//       // Now mount the React component into the popup container
//       const root = createRoot(popupNode)
//       root.render(
//         <WeatherPopupContent city={city} today={today} tomorrow={tomorrow} />
//       )

//       // Re‑open or update the popup so it resizes to fit content
//       popup.setDOMContent(popupNode).addTo(mapRef.current!)
//     })()

//     markerRef.current = marker
//   }, [city])

//   return <div ref={mapContainer} className='flex-1 h-full' />
// }

// export default MapView
