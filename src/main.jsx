import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import TopPage from './pages/TopPage'
import Garden from './pages/Garden'
import BLBusinessProgram from './pages/BusinessProgram'
import CompassProgram from './pages/CompassProgram'
import Privacy from './pages/Privacy'
import Tokutei from './pages/Tokutei'
import Contact from './pages/Contact'
import Travel from './pages/Travel'
import BridgeToJapan from './pages/BridgeToJapan'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/compass" element={<CompassProgram />} />
        <Route path="/business-program" element={<BLBusinessProgram />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tokutei" element={<Tokutei />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/bridge-to-japan" element={<BridgeToJapan />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
