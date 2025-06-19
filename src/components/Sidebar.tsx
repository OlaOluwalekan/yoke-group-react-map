import { useState } from 'react'
import Searchbar from './Searchbar'
import { useAppContext } from '../context/AppContext'
import CitiesList from './CitiesList'

const Sidebar = () => {
  const [searchValue, setSearchValue] = useState('')
  const { searchIsFocus } = useAppContext()

  return (
    <div className='flex flex-col fixed w-[90%] max-w-[400px] top-4 left-0 right-0 mx-auto z-20 md:right-[unset] md:left-4 gap-2'>
      <Searchbar value={searchValue} onChange={setSearchValue} />
      {searchIsFocus && (
        <CitiesList searchValue={searchValue} setSearchValue={setSearchValue} />
      )}
    </div>
  )
}

export default Sidebar
