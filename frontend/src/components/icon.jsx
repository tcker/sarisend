import React, { useState } from 'react'
import { X, History, FileText, Info, LogOut } from 'lucide-react'

export default function UserProfile({ 
  name = "John Doe", 
  profileImage = "/logo.png", 
  size = "medium",
  className = "" 
}) {
  const [isOpen, setIsOpen] = useState(false)

  // Size variants
  const sizeClasses = {
    small: {
      image: "w-8 h-8",
      text: "text-sm"
    },
    medium: {
      image: "w-12 h-12",
      text: "text-lg"
    },
    large: {
      image: "w-16 h-16",
      text: "text-xl"
    }
  };

  const currentSize = sizeClasses[size] || sizeClasses.medium;

  const menuItems = [
    { icon: History, label: "Transaction History", onClick: () => console.log("Transaction History") },
    { icon: FileText, label: "Terms and Conditions", onClick: () => console.log("Terms and Conditions") },
    { icon: Info, label: "About", onClick: () => console.log("About") },
  ]

  return (
    <>
      {/* Profile Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`flex items-center space-x-3 hover:opacity-80 transition-opacity z-50 ${className}`}
      >
        <img 
          src={profileImage}
          alt={`${name}'s profile`}
          className={`${currentSize.image} rounded-full object-cover border-2 border-gray-600`}
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
          }}
        />
        <span className={`${currentSize.text} font-medium text-white`}>
          {name}
        </span>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md">
          <div className="fixed left-0 top-0 h-full w-80 bg-gray-900 shadow-2xl transform transition-transform duration-300 z-[10000] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <img 
                  src={profileImage}
                  alt={`${name}'s profile`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                />
                <div>
                  <h3 className="text-lg font-medium text-white">{name}</h3>
                  <p className="text-sm text-gray-400">Wallet User</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 px-4 py-6">
              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.onClick()
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center space-x-4 px-4 py-4 text-left bg-gray-800/50 hover:bg-gray-700/70 rounded-2xl transition-all duration-200 text-white border border-gray-700/30"
                  >
                    <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Logout Button - Fixed at bottom */}
            <div className="mt-auto p-4 border-t border-gray-700/50">
              <button
                onClick={() => {
                  console.log("Logout")
                  setIsOpen(false)
                }}
                className="w-full flex items-center space-x-4 px-4 py-4 text-left bg-green-500 hover:bg-green-600 rounded-2xl transition-all duration-200 text-black font-medium shadow-lg"
              >
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-white" />
                </div>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
