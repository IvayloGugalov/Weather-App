import React from 'react'
import logo from './logo.svg'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'
import './App.css'
import Navbar from '../components/Navbar'

export { App }

function App({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {

  return (
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Navbar />
        <Content>
          {children}
        </Content>
      </Layout>
    </PageContextProvider>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='App'>
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div
        id="page-content"
        style={{
          padding: 20,
          paddingBottom: 50,
          minHeight: '50vh'
        }}
      >
        {children}
      </div>
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
