import React, { useState } from "react";
import { QrCode, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import petra from '../assets/petra.png'; 
import google from '../assets/GoogleIcon.webp'
export default function Signup() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handlePetraConnect = async () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      console.log("Connecting to Petra wallet...");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <section
          className="w-full max-w-sm space-y-8"
          aria-labelledby="wallet-connection"
        >
          {/* QR Code Section */}
          <header className="text-center space-y-6">
            {/* QR Code Container */}
            <figure className="relative mx-auto w-48 h-48 bg-gray-800/50 rounded-2xl border border-gray-700/50 flex items-center justify-center">
              {/* Mock QR Code */}
              <div
                className="w-40 h-40 bg-white rounded-lg flex items-center justify-center"
                role="img"
                aria-label="QR code for wallet connection"
              >
                <QrCode className="w-32 h-32 text-black" />
              </div>

              {/* Crypto Icons Overlay */}
              <div
                className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-black"
                aria-label="Bitcoin"
              >
                <span className="text-xs font-bold text-white">₿</span>
              </div>
              <div
                className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-2 border-black"
                aria-label="Ethereum"
              >
                <span className="text-xs font-bold text-white">Ξ</span>
              </div>
              <div
                className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-black"
                aria-label="Dollar"
              >
                <span className="text-xs font-bold text-white">$</span>
              </div>
            </figure>

            {/* Connect Text */}
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Connect with</p>
              <h1 id="wallet-connection" className="text-2xl font-bold">
                Sari<span className="text-green-500">Send</span>
              </h1>
            </div>
          </header>

          {/* Wallet Connection Options */}
          <section className="space-y-4" aria-labelledby="connection-methods">
            <h2 id="connection-methods" className="sr-only">
              Wallet Connection Methods
            </h2>

            {!isConnected ? (
              <>
                {/* Petra Wallet Button */}
                <button
                  onClick={handlePetraConnect}
                  disabled={isConnecting}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-black font-medium py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-between group"
                  aria-describedby="petra-wallet-description"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      aria-hidden="true"
                    >
                        <img src={petra} alt="" className="rounded-full"/>
                    </span>
                    <span className="text-lg">
                      {isConnecting ? "Connecting..." : "Petra Wallet"}
                    </span>
                  </div>

                  {isConnecting ? (
                    <div
                      className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"
                      aria-label="Loading"
                    ></div>
                  ) : (
                    <div
                      className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center group-hover:bg-black/30 transition-colors"
                      aria-hidden="true"
                    >
                      <span className="text-black text-sm">→</span>
                    </div>
                  )}
                </button>

                {/* Divider */}
                <section
                  className="relative"
                  role="separator"
                  aria-label="Alternative connection method"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>

                  <div className="relative flex justify-center text-xs">
                    <span className="bg-black px-3 text-gray-500">
                      or Login with Google
                    </span>
                  </div>
                </section>

                {/* Alternative Connection Info */}
                <aside className="text-center space-y-3">
                    <button className="w-full bg-white text-black font-medium py-4 px-6 rounded-2xl transition-all duration-200 flex items-center gap-3 group">
                    <span>
                        <img src={google} alt="Google Icon" className="w-8 h-8 mx-auto mb-2" />
                    </span>
                        Sign in with Google
                    </button>
                </aside>
              </>
            ) : (
              <div className="text-center space-y-6">
                {/* Success Message */}
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      className="w-8 h-8 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Wallet Connected!
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Your Petra wallet has been successfully connected to
                      SariSend
                    </p>
                  </div>
                </div>

                {/* Continue Button */}
                <Link
                  to="/Home"
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <span className="text-lg">Continue to Dashboard</span>
                  <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <span className="text-black text-sm">→</span>
                  </div>
                </Link>

                {/* Alternative Actions */}
                <div className="flex justify-center space-x-4 text-sm">
                  <button
                    onClick={() => setIsConnected(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Disconnect Wallet
                  </button>
                  <span className="text-gray-600">•</span>
                  <Link
                    to="/welcome"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Back to Welcome
                  </Link>
                </div>
              </div>
            )}
          </section>

          {/* Security Notice */}
          <aside
            className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4"
            aria-labelledby="security-notice"
          >
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-green-500 mt-0.5" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-7-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3
                  id="security-notice"
                  className="text-sm font-medium text-white mb-1"
                >
                  Secure Connection
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Your wallet connection is encrypted and secure. SariSend never
                  stores your private keys.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>

      {/* Footer */}
      <footer className="px-6 pb-8">
        <nav
          className="text-center space-y-2"
          aria-label="Legal and support links"
        >
          <p className="text-xs text-gray-500">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
          <ul className="flex justify-center space-x-4 text-xs">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </a>
            </li>
            <li>
              <span className="text-gray-600" aria-hidden="true">
                •
              </span>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </a>
            </li>
            <li>
              <span className="text-gray-600" aria-hidden="true">
                •
              </span>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Support
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </main>
  );
}
