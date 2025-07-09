
import { Routes, Route } from 'react-router-dom'
import { PaymentProvider } from './hooks/usePaymentContext.jsx'
import Home from './pages/home'
import Welcome from './pages/welcome'
import TokenInfo from './pages/tokenInfo'
import TransHisto from './pages/transHisto'
import SentConfirm from './pages/sentConfirm'
import Terms from './pages/terms'
import About from './pages/about'
import Merchant from './pages/merchant'
import Signup from './pages/signup'
import Payment from './pages/payment'
import MerchantQuestionnaire from './pages/merchantQuestionnaire'

export default function App() {
  return (
    <PaymentProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/token-info" element={<TokenInfo />} />
        <Route path="/transaction-history" element={<TransHisto />} />
        <Route path="/sent-confirm" element={<SentConfirm />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/merchant" element={<Merchant />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/merchant-questionnaire" element={<MerchantQuestionnaire />} />
      </Routes>
    </PaymentProvider>
  )
}

