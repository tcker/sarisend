import React from 'react'
import apt from "../assets/Aptos.png"
import btc from "../assets/BTC.png"
import eth from "../assets/ETH.png"
import { MoreHorizontal } from 'lucide-react'
export default function Token() {
     const tokens = [
    { 
      name: 'Aptos', 
      symbol: 'APT', 
      value: '$100', 
      change: '+0.18%', 
      positive: true,
      icon: apt
    },
    { 
      name: 'BTC', 
      symbol: 'BTC', 
      value: '$100', 
      change: '-0.18%', 
      positive: false,
      icon: btc
    },
    { 
      name: 'ETH', 
      symbol: 'ETH', 
      value: '$40', 
      change: '+0.18%', 
      positive: true,
      icon: eth
    },
    { 
      name: 'Aptos', 
      symbol: 'APT', 
      value: '$100', 
      change: '+0.18%', 
      positive: true,
      icon: apt
    },
    { 
      name: 'BTC', 
      symbol: 'BTC', 
      value: '$100', 
      change: '-0.18%', 
      positive: false,
      icon: btc
    },
    { 
      name: 'ETH', 
      symbol: 'ETH', 
      value: '$40', 
      change: '+0.18%', 
      positive: true,
      icon: eth
    }
  ];
  return (
     <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium">Tokens</h2>
            <button>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
            </div>
        
        <div className="space-y-3">
          {tokens.map((token, index) => (
            <div key={index} className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center p-2">
                  <img 
                    src={token.icon} 
                    alt={token.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-medium">{token.name}</span>
              </div>
              <div className="text-right">
                <p className="font-medium">{token.value}</p>
                <p className={`text-sm ${token.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {token.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
