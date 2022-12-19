import React, { useState } from 'react'
import SearchBar from '../../components/SearchBar'

export { Layout }

const Layout = ({ children }: { children: React.ReactNode }) => {

  const [search, setSearch] = useState<string>('');

  return (
    <div
      className='
        bg-white
        flex
        flex-col
        justify-start
        items-center'
    >

      <SearchBar setSearch={setSearch} serverSide={true} />

      {children}
    </div>
  )
}
