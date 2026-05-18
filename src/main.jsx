import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ZuhoorApp from './Zuhoor.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ZuhoorApp />
  </StrictMode>
)