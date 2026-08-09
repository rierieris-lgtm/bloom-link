import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import TopPage from './pages/TopPage'
import Garden from './pages/Garden'
import BLBusinessProgram from './pages/BusinessProgram'
import CompassProgram from './pages/CompassProgram'
import Privacy from './pages/Privacy'
import Tokutei from './pages/Tokutei'
import Contact from './pages/Contact'
import Travel from './pages/Travel'

// 別ページから /garden#launch のようなハッシュ付きURLで来たとき、
// React Routerは自動でスクロールしないので該当セクションまで移動させる
function ScrollToHash() {
  const { hash } = useLocation()
  React.useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])
  return null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/compass" element={<CompassProgram />} />
        <Route path="/business-program" element={<BLBusinessProgram />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tokutei" element={<Tokutei />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/travel" element={<Travel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
