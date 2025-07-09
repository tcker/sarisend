
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Welcome from './pages/welcome'
import TokenInfo from './pages/tokenInfo'
import TransHisto from './pages/transHisto'
import SentConfirm from './pages/sentConfirm'
import Terms from './pages/terms'
import About from './pages/about'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/token-info" element={<TokenInfo />} />
        <Route path="/transaction-history" element={<TransHisto />} />
        <Route path="/sent-confirm" element={<SentConfirm />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

