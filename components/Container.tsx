import React, { useState } from 'react'
import SearchBar from './SearchBar'
import ErrorBoundary from '../errors/ErrorBoundary';

const Loading = () => <img src='../assets/loading.svg'></img>;

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

      <SearchBar setSearch={setSearch} serverSide={false} setSearchExecuted={setSearchExecuted} />

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
    <React.Suspense fallback={<Loading /> }>
      <ErrorBoundary>
        <WeatherForecast search={search} />
      </ErrorBoundary>
    </React.Suspense>
  );
}

export default Container