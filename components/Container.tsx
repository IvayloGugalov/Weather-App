import React, { useState } from 'react'
import SearchBar from './SearchBar'
import '../styles/initial.css'

const Loading = () => <div>Loading...</div>;

const Container = () => {

  const [search, setSearch] = useState<string>('');
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);

  return (
    <div
      className='
        bg-white
        flex
        flex-col
        justify-start
        items-center'>
      <SearchBar setSearch={setSearch} setSearchExecuted={setSearchExecuted} />

      {searchExecuted && (
        <div>
          <WeatherForecast search={search} />
        </div>
      )}
    </div>
  )
}

function WeatherForecast({search}: {search: string}) {
  // We lazily load the client-side component
  const WeatherForecast = React.lazy(() => import('./WeatherForecast'));
  return (
    <React.Suspense>
      <div className='fade-in '>
        <WeatherForecast search={search} />
      </div>
    </React.Suspense>
  );
}

export default Container