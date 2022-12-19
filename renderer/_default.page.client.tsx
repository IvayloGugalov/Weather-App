import React from 'react'
import { App } from './App'
import type { PageContextClient } from './types'
import ReactDOM from 'react-dom/client'
import { getPageTitle } from './getPageTitle'
import { sleep } from '../helpers/simulateLoad'

export { render }
export { onHydrationEnd }
export { onPageTransitionStart }
export { onPageTransitionEnd }
export const hydrationCanBeAborted = true
export const clientRouting = true

let root: ReactDOM.Root
async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  const page = (
    <App pageContext={pageContext}>
      <Page {...pageProps} />
    </App>
  )
  const container = document.getElementById('page-view')!
  // SPA
  if (container.innerHTML === '' || !pageContext.isHydration) {
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
    // SSR
  } else {
    root = ReactDOM.hydrateRoot(container, page)
  }

  document.title = getPageTitle(pageContext)
}

function onHydrationEnd() {
  console.log('Hydration finished; page is now interactive.')
}
function onPageTransitionStart() {
  document.querySelector('body')!.classList.add('page-is-transitioning')
}
function onPageTransitionEnd() {
  sleep(800)
    .then(() => {
        document.querySelector('body')!.classList.remove('page-is-transitioning')
    })
}
