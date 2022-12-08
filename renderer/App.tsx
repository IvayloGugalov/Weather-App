import React, { useState } from 'react'
import logo from './logo.svg'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'
import './App.css'
import { Link } from './Link'


export { App }

function App({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {

  return (
      <PageContextProvider pageContext={pageContext}>
          <Layout>
            <Content>{children}</Content>
          </Layout>
      </PageContextProvider>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className='App'
      style={{
        display: 'flex',
        margin: 'auto'
      }}
    >
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh'
      }}
    >
      {children}
    </div>
  )
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10
      }}
    >
      <a href="/">
        <img src={logo} height={64} width={64} alt="logo" />
      </a>
    </div>
  )
}
