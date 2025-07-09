import React, { useState } from 'react'
import Sidebar from './Sidebar'

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

      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        name={name}
        profileImage={profileImage}
      />
    </>
  )
}
