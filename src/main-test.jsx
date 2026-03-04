import React from 'react'
import ReactDOM from 'react-dom/client'
import Test from './Test.jsx'

console.log('[MAIN] React importé:', React)
console.log('[MAIN] ReactDOM importé:', ReactDOM)
console.log('[MAIN] Test component importé:', Test)

const root = document.getElementById('root')
console.log('[MAIN] Root element:', root)

if (root) {
  console.log('[MAIN] Creating React root...')
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <Test />
      </React.StrictMode>,
    )
    console.log('[MAIN] ✅ React mounted successfully!')
  } catch (error) {
    console.error('[MAIN] ❌ Error mounting React:', error)
  }
} else {
  console.error('[MAIN] ❌ Root element not found!')
}
