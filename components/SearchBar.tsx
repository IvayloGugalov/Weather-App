

import React from 'react'

const SearchBar = ({ setSearch, setSearchExecuted }:
  {setSearch:Function, setSearchExecuted: Function}) => {

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const input = document.getElementById('search') as HTMLInputElement;
        setSearchExecuted(true)
        setSearch(input.value)
      }}
      className='w-full flex justify-center pt-8 pb-4'
    >
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
      >
        Search
      </label>
      <div className='relative flex items-center'>
        <input
          type='search'
          id='search'
          className='
            block
            py-4
            pl-4
            pr-16
            w-72
            text-sm
            text-gray-900
            border
            border-orange-400
            rounded-2xl
            bg-gray-50
            focus:outline-none
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-orange-500
            dark:focus:border-orange-500'
          placeholder='Enter Your Location'
          required
        />
        <button
          type="submit"
          className="
            absolute
            right-2
            p-2.5
            ml-2
            text-sm
            font-medium
            text-white
            bg-orange-500
            rounded-lg
            border
            border-orange-700
            hover:bg-orange-600
            focus:ring-4
            focus:outline-none
            focus:ring-orange-300
            dark:bg-orange-600
            dark:hover:bg-orange-700
            dark:focus:ring-orange-800"
          >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  )
}

export default SearchBar