import { FaSearch, FaTimes } from 'react-icons/fa'
import type { SearchbarProps } from '../types'
import { useAppContext } from '../context/AppContext'
import clsx from 'clsx'

const Searchbar = ({ value, onChange }: SearchbarProps) => {
  const { setSearchIsFocus, searchIsFocus } = useAppContext()

  return (
    <div
      className={clsx(
        'flex items-center rounded-lg px-2 bg-white',
        searchIsFocus ? '' : 'shadow-md'
      )}
    >
      <span className='text-gray-500'>
        <FaSearch />
      </span>
      <input
        type='text'
        placeholder='Search city...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full px-3 py-2 focus:outline-none'
        onFocus={() => setSearchIsFocus(true)}
        // onBlur={() => setSearchIsFocus(false)}
      />
      {value && (
        <button
          onClick={() => {
            onChange('')
            setSearchIsFocus(true)
          }}
          className='cursor-pointer'
        >
          <FaTimes />
        </button>
      )}
    </div>
  )
}

export default Searchbar
