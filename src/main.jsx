import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// The single-file preview build has no real URL paths, so it keeps routes in memory.
const Router = import.meta.env.VITE_PREVIEW ? MemoryRouter : BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
