import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StockContextProvider } from './contexts/StockContext.jsx'
createRoot(document.getElementById('root')).render(
  <StockContextProvider >
  <StrictMode>
    <App />
  </StrictMode>
  </StockContextProvider>
)
