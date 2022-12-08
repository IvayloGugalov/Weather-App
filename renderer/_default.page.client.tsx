import React from 'react'
import { App } from './App'
import type { PageContextClient } from './types'
import ReactDOM from 'react-dom/client'
import { getPageTitle } from './getPageTitle'

export { render }
export { onHydrationEnd }
export { onPageTransitionStart }
export { onPageTransitionEnd }

let root: ReactDOM.Root
async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  const page = (
    <App pageContext={pageContext}>
      <Page {...pageProps} />
    </App>
  )
  const container = document.getElementById('page-view')!
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page)
  } else {
    if (!root) {
      root =
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
  }
  document.title = getPageTitle(pageContext)
}

function onHydrationEnd() {
  console.log('Hydration finished; page is now interactive.')
}
function onPageTransitionStart() {
  console.log('Page transition start')
  document.querySelector('body')!.classList.add('page-is-transitioning')
}
function onPageTransitionEnd() {
  console.log('Page transition end')
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
