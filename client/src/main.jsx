import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
