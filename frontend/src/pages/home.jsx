import React from "react";
import { QrCode, Send, Download, MoreHorizontal, User } from "lucide-react";
import UserProfile from "../components/icon";
import user from "../assets/userPfp.jpg";
import Ellipsis from '../assets/Ellipse.png'
import Token from "../components/token";
import Ads from '../components/ads'
export default function Home() {
  return (
    <main className="min-h-screen mx-4 p-4 relative overflow-hidden">
      {/* Background Ellipsis */}
      <div className="absolute top-[-6rem]">
        <img 
          src={Ellipsis} 
          alt="Background decoration" 
          className="w-4xl h-4xl object-contain"
        />
      </div>
      
      <header className="relative z-10 flex items-center justify-between mb-8 pt-4">
        <UserProfile profileImage={user} />
        <button className="bg-green-500 text-black rounded-full px-6 py-2 font-mono shadow-md shadow-green-500/80 hover:shadow-green-500/90 transition-all duration-200">
          Connect Wallet
        </button>
      </header>

      <section className="relative z-10 flex-col items-center gap-2">
        <p>Balance</p>
        <h1 className="text-5xl">$23,000.00</h1>
      </section>

      <section className="relative z-10 bg-gradient-to-b from-[#FFFDFD]/40 via-[#FFFDFD]/20 to-[#FFFFFF]/0 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 mb-6 mt-10">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            {/* QR Corner indicators */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-green-500 rounded-tl-lg"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-green-500 rounded-tr-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-green-500 rounded-bl-lg"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-green-500 rounded-br-lg"></div>
          </div>
          <span className="text-green-500 font-medium">Scan QR</span>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="relative z-10 flex space-x-4 mb-8">
        <button className="flex-1 bg-gradient-to-b from-[#FFFDFD]/40 via-[#FFFDFD]/20 to-[#FFFFFF]/0 backdrop-blur-sm border border-gray-600 rounded-2xl p-6 flex flex-col items-center space-y-2 hover:bg-gray-600/50 transition-colors">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <Send className="w-6 h-6 text-white" />
          </div>
          <span className="text-green-500 font-medium">Send</span>
        </button>
        <button className="flex-1 bg-gradient-to-b from-[#FFFDFD]/40 via-[#FFFDFD]/20 to-[#FFFFFF]/0 backdrop-blur-sm border border-gray-600 rounded-2xl p-6 flex flex-col items-center space-y-2 hover:bg-gray-600/50 transition-colors">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <span className="text-green-500 font-medium">Receive</span>
        </button>
      </section>


    <Ads/>
    <Token/>
    </main>
  );
}
