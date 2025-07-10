import React, { useState, useEffect } from 'react'
import { ArrowLeft, User, Scan, Plus, Minus } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { usePaymentContext } from '../hooks/usePaymentContext.jsx'

export default function Payment() {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [note, setNote] = useState('')
  const [isInsufficientBalance, setIsInsufficientBalance] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { updatePaymentData } = usePaymentContext()
  
  const totalBalance = 2847.92
  
  // APT to USD conversion rate (in a real app, this would come from an API)
  const aptToUsdRate = 8.45 // Example: 1 APT = $8.45 USD
  
  // Calculate gas fee (0.5% of amount, minimum 0.001 APT)
  const calculateGasFee = (paymentAmount) => {
    if (!paymentAmount || paymentAmount <= 0) return 0.001
    const fee = paymentAmount * 0.005 // 0.5%
    return Math.max(fee, 0.001) // Minimum 0.001 APT
  }
  
  const currentAmount = parseFloat(amount) || 0
  const gasFee = calculateGasFee(currentAmount)
  const totalCost = currentAmount + gasFee
  const maxSendableAmount = totalBalance - 0.001 
  
  const usdAmount = currentAmount * aptToUsdRate
  const usdTotalCost = totalCost * aptToUsdRate
  const usdBalance = totalBalance * aptToUsdRate

  useEffect(() => {
    const hasReloadedThisSession = sessionStorage.getItem('paymentPageReloadedThisSession')
    if (!hasReloadedThisSession) {
      sessionStorage.setItem('paymentPageReloadedThisSession', 'true')
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    if (location.state?.scannedData) {
      console.log('Scanned data:', location.state.scannedData)
      setRecipient('Scanned Recipient')
    } else {
      setRecipient('188AAA...BBBB')
    }
  }, [location.state])

  useEffect(() => {
    setIsInsufficientBalance(totalCost > totalBalance)
  }, [totalCost, totalBalance])

  const handleAmountChange = (value) => {
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const addAmount = (value) => {
    const currentAmount = parseFloat(amount) || 0
    const newAmount = currentAmount + value
    setAmount(newAmount.toString())
  }
  
  const setMaxAmount = () => {
    setAmount(maxSendableAmount.toFixed(6))
  }

  const handleNext = () => {
    // Update payment context with current payment data
    const paymentInfo = {
      amount: currentAmount,
      recipient: recipient,
      recipientName: recipient === '188AAA...BBBB' ? 'Default Recipient' : 'Scanned Recipient',
      note: note,
      gasFee: gasFee,
      totalCost: totalCost,
      remainingBalance: totalBalance - totalCost,
      timestamp: new Date().toISOString()
    }
    
    updatePaymentData(paymentInfo)
    navigate('/sent-confirm')
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-950 px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/home" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white">Payment</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      <div className="px-6 py-8 space-y-8">
        {/* Recipient Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            {/* Recipient Avatar */}
            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mx-auto">
              <User className="w-12 h-12 text-gray-300" />
            </div>
            
            {/* Recipient Info */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                {recipient || 'Enter Recipient Address'}
              </h2>
              <p className="text-gray-400 text-sm">Send APT tokens</p>
            </div>
          </div>
        </section>

        {/* Amount Section */}
        <section className="space-y-6">
          {/* Amount Input */}
          <div className="text-center space-y-6">
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent text-4xl font-bold text-white text-center border-2 border-blue-500 rounded-2xl py-8 px-6 focus:outline-none focus:border-purple-500 transition-colors pr-24 pb-16"
              />
              
              {/* Max Button */}
              <button
                onClick={setMaxAmount}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-black text-sm font-bold px-3 py-2 rounded-lg transition-colors"
              >
                MAX
              </button>
              
              {/* Amount Label and Gas Fee */}
              <div className="absolute inset-x-0 bottom-3 flex justify-between items-center px-6">
                <div className="text-left">
                  <p className="text-gray-400 text-sm">Enter Amount (APT)</p>
                  {currentAmount > 0 && (
                    <p className="text-blue-400 text-xs">
                      ≈ ${usdAmount.toFixed(2)} USD
                    </p>
                  )}
                </div>
                {currentAmount > 0 && (
                  <p className="text-yellow-400 text-xs">
                    Transaction: {gasFee.toFixed(6)} APT
                  </p>
                )}
              </div>
            </div>
            
            {/* Total Cost Display */}
            {currentAmount > 0 && (
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Amount:</span>
                  <div className="text-right">
                    <span className="text-white">{currentAmount.toFixed(6)} APT</span>
                    <div className="text-blue-400 text-xs">≈ ${usdAmount.toFixed(2)} USD</div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Transaction Fee (0.5%):</span>
                  <div className="text-right">
                    <span className="text-yellow-400">+{gasFee.toFixed(6)} APT</span>
                    <div className="text-yellow-300 text-xs">≈ ${(gasFee * aptToUsdRate).toFixed(4)} USD</div>
                  </div>
                </div>
                <div className="border-t border-gray-600 mt-2 pt-2 flex justify-between items-center font-medium">
                  <span className="text-white">Total Cost:</span>
                  <div className="text-right">
                    <span className="text-green-400">{totalCost.toFixed(6)} APT</span>
                    <div className="text-green-300 text-xs">≈ ${usdTotalCost.toFixed(2)} USD</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Note Section */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-gray-300">
            Add a note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's this payment for?"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors resize-none"
            rows="3"
          />
        </section>

        {/* Balance Info */}
        <section className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Available Balance</span>
            <div className="text-right">
              <span className="text-white font-medium">{totalBalance.toFixed(2)} APT</span>
              <div className="text-blue-400 text-xs">≈ ${usdBalance.toFixed(2)} USD</div>
            </div>
          </div>
          {isInsufficientBalance && (
            <div className="mt-2 text-red-400 text-xs">
              ⚠️ Insufficient balance (including gas fee)
            </div>
          )}
        </section>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!amount || parseFloat(amount) <= 0 || isInsufficientBalance}
          className="w-full bg-green-500 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 disabled:opacity-50"
        >
          {isInsufficientBalance ? 'Insufficient Balance' : 'Next'}
        </button>

        {/* Security Notice */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            🔒 Your transaction is secured with end-to-end encryption
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <span>Max sendable: {maxSendableAmount.toFixed(6)} APT</span>
            <span>•</span>
            <span>1 APT = ${aptToUsdRate.toFixed(2)} USD</span>
          </div>
        </div>
      </div>
    </main>
  )
}
