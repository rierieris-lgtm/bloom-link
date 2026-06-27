import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import BloomingGardenPage from './pages/BloomingGarden'
import BLBusinessProgram from './pages/BusinessProgram'
import CompassProgram from './pages/CompassProgram'
import Privacy from './pages/Privacy'
import Tokutei from './pages/Tokutei'
import Contact from './pages/Contact'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BloomingGardenPage />} />
        <Route path="/compass" element={<CompassProgram />} />
        <Route path="/business-program" element={<BLBusinessProgram />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tokutei" element={<Tokutei />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
