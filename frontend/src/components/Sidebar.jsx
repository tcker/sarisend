import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { X, History, FileText, Info, LogOut } from "lucide-react";
import user from "../assets/userPfp.jpg";

export default function Sidebar({
  isOpen,
  onClose,
  walletAddress = "",
  disconnectWallet,
  profileImage = user,
  isMerchant = false, // New prop to determine if user is merchant
}) {
  const navigate = useNavigate();
  const menuItems = [
    { 
      icon: History, 
      label: "Transaction History", 
      to: isMerchant ? "/merchant-transaction-history" : "/transaction-history" 
    },
    { icon: FileText, label: "Terms and Conditions", to: "/terms" },
    { icon: Info, label: "About", to: "/about" },
  ];

  const displayName =
    walletAddress && walletAddress.length >= 10
      ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      : "";

  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sidebar-title"
    >
      <aside
        ref={sidebarRef}
        className="fixed left-0 top-0 h-full w-80 bg-gray-900 shadow-2xl transform translate-x-0 transition-transform duration-300 z-[10000] flex flex-col"
      >
        <header className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
           
            <div>
              <h2
                id="sidebar-title"
                className="text-lg font-medium text-white break-all"
              >
                {displayName}
              </h2>
              <p className="text-sm text-gray-400">Wallet User</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </header>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  onClick={onClose}
                  className="w-full flex items-center space-x-4 px-4 py-4 text-left bg-gray-800/50 hover:bg-gray-700/70 rounded-2xl transition-all duration-200 text-white border border-gray-700/30"
                >
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      <footer className="mt-auto p-4 border-t border-gray-700/50">
        <button
          onClick={() => {
            disconnectWallet();
            onClose();
            navigate("/"); // ⬅️ redirect to home page after logout
          }}
          className="w-full flex items-center space-x-4 px-4 py-4 text-left bg-green-500 hover:bg-green-600 rounded-2xl transition-all duration-200 text-black font-medium shadow-lg"
        >
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <LogOut className="w-4 h-4 text-white" />
          </div>
          <span>Logout</span>
        </button>
      </footer>
    </aside>
    </div>
  );
}
