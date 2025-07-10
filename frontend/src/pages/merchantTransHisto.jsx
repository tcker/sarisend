import React, { useState, useEffect } from 'react'
import { ArrowLeft, User, DollarSign, Filter, Search, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import APT from '../assets/Aptos.png'
import { usePaymentContext } from '../hooks/usePaymentContext'

export default function MerchantTransHisto() {
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { paymentData } = usePaymentContext()

  // Dummy merchant payment data - in a real app, this would come from backend/blockchain
  const [merchantPayments, setMerchantPayments] = useState([
    {
      id: '1',
      transactionId: '3232-2323-1211',
      customerName: '0x742d...4B8f',
      amount: '125.50',
      amountUSD: '1506.00',
      product: 'Premium Coffee Beans',
      timestamp: '2024-12-07 14:30',
      status: 'completed',
      hash: '0xabc123...def456',
      paymentMethod: 'APT Wallet'
    },
    {
      id: '2',
      transactionId: '1111-2222-3333',
      customerName: '0x123a...9c2d',
      amount: '75.25',
      amountUSD: '903.00',
      product: 'Organic Tea Set',
      timestamp: '2024-12-07 12:15',
      status: 'completed',
      hash: '0x789xyz...uvw012',
      paymentMethod: 'APT Wallet'
    },
    {
      id: '3',
      transactionId: '2222-3333-4444',
      customerName: '0x456b...7e8f',
      amount: '250.00',
      amountUSD: '3000.00',
      product: 'Coffee Machine',
      timestamp: '2024-12-06 16:45',
      status: 'completed',
      hash: '0x345abc...789def',
      paymentMethod: 'APT Wallet'
    },
    {
      id: '4',
      transactionId: '5555-6666-7777',
      customerName: '0x789c...1a2b',
      amount: '42.75',
      amountUSD: '513.00',
      product: 'Artisan Pastries',
      timestamp: '2024-12-06 09:20',
      status: 'completed',
      hash: '0x567def...123ghi',
      paymentMethod: 'APT Wallet'
    },
    {
      id: '5',
      transactionId: '8888-9999-0000',
      customerName: '0x321f...8d4c',
      amount: '98.60',
      amountUSD: '1183.20',
      product: 'Gift Card Bundle',
      timestamp: '2024-12-05 11:30',
      status: 'pending',
      hash: '0x890ghi...456jkl',
      paymentMethod: 'APT Wallet'
    }
  ])

  // Add new payment from context when a payment is made
  useEffect(() => {
    if (paymentData.timestamp && paymentData.amount > 0) {
      const newPayment = {
        id: Date.now().toString(),
        transactionId: paymentData.recipient || '0xnew...user',
        customerName: paymentData.recipientName || 'Unknown Customer',
        amount: paymentData.amount.toString(),
        amountUSD: (paymentData.amount * 12).toFixed(2), // Mock APT to USD conversion
        product: paymentData.note || 'Product Purchase',
        timestamp: new Date(paymentData.timestamp).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).replace(',', ''),
        status: 'completed',
        hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 6)}`,
        paymentMethod: 'APT Wallet'
      }
      
      setMerchantPayments(prev => [newPayment, ...prev])
    }
  }, [paymentData])

  const filteredPayments = merchantPayments.filter(payment => {
    const matchesType = filterType === 'all' || payment.status === filterType
    const matchesSearch = searchTerm === '' || 
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.product.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getTotalRevenue = () => {
    return filteredPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + parseFloat(p.amount), 0)
      .toFixed(2)
  }

  const getTotalRevenueUSD = () => {
    return filteredPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + parseFloat(p.amountUSD), 0)
      .toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Link 
            to="/merchant" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl p-2 sm:p-3 text-black" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">Payment History</h1>
          <div className="w-10 sm:w-20"></div> {/* Spacer for center alignment */}
        </div>

        {/* Revenue Summary */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl p-4 sm:p-6 mb-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-green-400 mb-1">Total Revenue</h2>
              <p className="text-2xl sm:text-3xl font-bold">{getTotalRevenue()} APT</p>
              <p className="text-gray-400 text-sm sm:text-base">${getTotalRevenueUSD()} USD</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-2xl">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-800/50 rounded-3xl p-4 sm:p-6 mb-6 border border-gray-700/30">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers, products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 text-sm sm:text-base"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 rounded-2xl px-3 py-3 text-white focus:outline-none focus:border-green-500 text-sm sm:text-base min-w-[100px]"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/30">
            <p className="text-gray-400 text-sm">Today's Payments</p>
            <p className="text-xl font-bold">
              {filteredPayments.filter(p => 
                new Date(p.timestamp).toDateString() === new Date().toDateString()
              ).length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/30">
            <p className="text-gray-400 text-sm">Completed</p>
            <p className="text-xl font-bold text-green-400">
              {filteredPayments.filter(p => p.status === 'completed').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/30 col-span-2 sm:col-span-1">
            <p className="text-gray-400 text-sm">Pending</p>
            <p className="text-xl font-bold text-yellow-400">
              {filteredPayments.filter(p => p.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Payments List */}
        <div className="space-y-4">
          {filteredPayments.length === 0 ? (
            <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700/30 text-center">
              <DollarSign className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No payments found</h3>
              <p className="text-gray-500">Payments from customers will appear here</p>
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <div key={payment.id} className="bg-gray-800/50 rounded-3xl p-4 sm:p-6 border border-gray-700/30 hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    {/* Customer Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>

                    {/* APT Token Icon */}
                    <img 
                      src={APT} 
                      alt="APT"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                    />

                    {/* Payment Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-sm sm:text-base truncate">{payment.customerName}</h3>
                        {getStatusIcon(payment.status)}
                        <span className={`px-2 py-1 rounded-full text-xs hidden sm:inline ${
                          payment.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : payment.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm truncate">
                        {payment.product}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        Transaction ID: {payment.transactionId}
                      </p>
                      <p className="text-gray-500 text-xs hidden sm:block">{payment.timestamp}</p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-sm sm:text-lg text-green-400">
                      +{payment.amount} APT
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      ${payment.amountUSD}
                    </p>
                    <p className="text-gray-400 text-xs cursor-pointer hover:text-white transition-colors hidden sm:block" 
                       title={`Hash: ${payment.hash}`}>
                      View on Explorer
                    </p>
                  </div>
                </div>
                {/* Mobile timestamp and status */}
                <div className="flex items-center justify-between mt-2 sm:hidden">
                  <p className="text-gray-500 text-xs">{payment.timestamp}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : payment.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredPayments.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-green-500 hover:bg-green-600 text-black font-medium px-8 py-3 rounded-2xl transition-colors shadow-lg">
              Load More Payments
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
