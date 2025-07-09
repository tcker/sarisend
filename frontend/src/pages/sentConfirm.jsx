import React from 'react'
import { ArrowLeft, Check, Copy, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import Homebtn from '../components/homeArrow'
export default function SentConfirm() {
    //change data to reyal when done
  const transactionData = {
    date: 'Tue, August 08, 2025 • 9:27:53 AM',
    transactionId: '0237-7746-8981-9028-5626',
    tokenSent: 'Aptos',
    customerId: '100200300AAABBBB',
    customerName: 'John Doe',
    amount: '90 APT',
    serviceFee: '10 APT',
    total: '100 APT',
    hash: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz'
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }
  

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
         <Homebtn/>
          <h1 className="text-xl font-bold">Transaction Receipt</h1>
          <div className="w-10" aria-hidden="true"></div> {/* Spacer */}
        </header>

        {/* Receipt Card */}
        <article className="bg-white text-black rounded-t-3xl p-6 shadow-2xl relative">
          {/* Success Icon */}
          <div className="flex justify-center mb-6" aria-hidden="true">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Transaction Successful */}
          <header className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Transaction Successful!</h2>
            <p className="text-gray-600">Your transaction has been completed</p>
          </header>

          {/* Date */}
          <time className="block text-center text-sm text-gray-500 mb-6" dateTime="2025-08-08T09:27:53">
            {transactionData.date}
          </time>

          {/* Transaction ID */}
          <section className="border-2 border-dashed border-gray-300 rounded-2xl p-4 mb-6 text-center">
            <h3 className="text-xs text-gray-500 mb-1">Transaction ID</h3>
            <div className="flex items-center justify-center space-x-2">
              <span className="font-mono text-sm">{transactionData.transactionId}</span>
              <button 
                onClick={() => copyToClipboard(transactionData.transactionId)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Copy transaction ID"
              >
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </section>

          {/* Token Sent */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Token Sent</span>
            <span className="font-medium">{transactionData.tokenSent}</span>
          </div>

          <hr className="border-gray-200 mb-4" />

          {/* Customer Details */}
          <section className="space-y-3 mb-6">
            <h3 className="sr-only">Customer Information</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Customer ID</span>
              <span className="font-mono text-sm">{transactionData.customerId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Customer Name</span>
              <span className="font-medium">{transactionData.customerName}</span>
            </div>
          </section>

          <hr className="border-gray-200 mb-4" />

          {/* Amount Details */}
          <section className="space-y-3 mb-6">
            <h3 className="sr-only">Transaction Amount</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="font-medium">{transactionData.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Service Fee</span>
              <span className="font-medium">{transactionData.serviceFee}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-lg">{transactionData.total}</span>
            </div>
          </section>

          {/* SariSend Branding */}
          <footer className="text-center">
            <h3 className="text-3xl font-bold">
              Sari<span className="text-green-500">Send</span>
            </h3>
          </footer>
        </article>

        {/* Receipt Bottom with Torn Edge Effect */}
        <div className="bg-white h-6 relative" aria-hidden="true">
          <div className="absolute inset-0 bg-white" 
               style={{
                 clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%, 100% 100%, 0% 100%)'
               }}>
          </div>
        </div>

        {/* Action Buttons */}
        <nav className="mt-8 space-y-4">
          <button
            onClick={() => copyToClipboard(transactionData.hash)}
            className="w-full flex items-center justify-center space-x-2 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600 rounded-2xl px-6 py-4 text-white transition-colors"
            aria-label="Copy transaction hash to clipboard"
          >
            <Copy className="w-5 h-5" aria-hidden="true" />
            <span>Copy Transaction Hash</span>
          </button>

          <button 
            className="w-full flex items-center justify-center space-x-2 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600 rounded-2xl px-6 py-4 text-white transition-colors"
            onClick={() => window.open('#', '_blank')}
            aria-label="View transaction on blockchain explorer"
          >
            <ExternalLink className="w-5 h-5" aria-hidden="true" />
            <span>View on Explorer</span>
          </button>

          <Link 
            to="/"
            className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-2xl px-6 py-4 text-black font-medium transition-colors shadow-lg"
          >
            Back to Home
          </Link>
        </nav>
      </div>
    </main>
  )
}
