import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/noto-serif/latin-400.css'
import '@fontsource/noto-serif/latin-ext-400.css'
import './index.css'
import App from './App.tsx'

/** #root is the scroll container; keep reloads at the top unless the URL has a hash target. */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
const rootEl = document.getElementById('root')
const alignScrollContainerToHash = () => {
  if (window.location.hash || !rootEl) return
  rootEl.scrollTop = 0
}
alignScrollContainerToHash()
window.addEventListener('pageshow', (event) => {
  if (event.persisted) alignScrollContainerToHash()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
