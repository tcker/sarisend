import React, { createContext, useContext, useState } from 'react'

// Create the Payment Context
const PaymentContext = createContext()

// Payment Provider Component
export function PaymentProvider({ children }) {
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    recipient: '',
    recipientName: '',
    note: '',
    gasFee: 0,
    totalCost: 0,
    remainingBalance: 0,
    timestamp: null,
    // Additional merchant data
    customerId: '',
    customerName: '',
    product: '',
    merchantId: ''
  })

  const updatePaymentData = (data) => {
    setPaymentData(prev => ({ ...prev, ...data }))
  }

  const clearPaymentData = () => {
    setPaymentData({
      amount: 0,
      recipient: '',
      recipientName: '',
      note: '',
      gasFee: 0,
      totalCost: 0,
      remainingBalance: 0,
      timestamp: null,
      // Additional merchant data
      customerId: '',
      customerName: '',
      product: '',
      merchantId: ''
    })
  }

  return (
    <PaymentContext.Provider value={{
      paymentData,
      updatePaymentData,
      clearPaymentData
    }}>
      {children}
    </PaymentContext.Provider>
  )
}

// Custom hook to use Payment Context
export function usePaymentContext() {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider')
  }
  return context
}
