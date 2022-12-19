import React from 'react'
import Container from '../../components/Container'

export { Page }

function Page() {
  return (
    <>
      <h1 className='mb-4 text-xl font-bold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-3xl dark:text-white'>
        Welcome to the Weather App
      </h1>
      <h2 className='flex text-xl font-bold text-gray-600'>
        Choose either
        &nbsp;<a href='/server-side' className="block rounded text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-500">Server side</a>&nbsp;
        or
        &nbsp;<a href='/client-side' className="block rounded text-transparent bg-clip-text bg-gradient-to-r to-sky-500 from-emerald-600">Client side</a>&nbsp;
        to view the different types of rendering
      </h2>
    </>
  )
}
