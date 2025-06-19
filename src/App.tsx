import MapView from './components/MapView'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <MapView />
    </div>
  )
}

export default App
