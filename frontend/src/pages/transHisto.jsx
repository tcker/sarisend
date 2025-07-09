import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTransactionHistory } from "../hooks/useTransactionHistory";
import APT from "../assets/Aptos.png";
import BTC from "../assets/BTC.png";
import ETH from "../assets/ETH.png";

export default function TransHisto({ wallet }) {
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { transactions, loading } = useTransactionHistory(wallet);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = filterType === "all" || tx.type === filterType;
    const matchesSearch =
      searchTerm === "" ||
      tx.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTokenIcon = (token) => {
    const iconMap = {
      ETH: ETH,
      BTC: BTC,
      APT: APT,
    };
    return iconMap[token] || APT;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 sm:mb-8">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl p-2 sm:p-3 text-black" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">Transaction History</h1>
          <div className="w-10 sm:w-20" aria-hidden="true"></div>
        </header>

        {/* Search and Filter */}
        <section className="bg-gray-800/50 rounded-3xl p-4 sm:p-6 mb-6 border border-gray-700/30">
          <form className="flex items-center gap-3" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 rounded-2xl px-3 py-3 text-white focus:outline-none focus:border-green-500 text-sm sm:text-base min-w-[80px]"
              >
                <option value="all">All</option>
                <option value="send">Sent</option>
                <option value="receive">Received</option>
              </select>
            </div>
          </form>
        </section>

        {/* Transaction List */}
        <section className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-400">Loading transactions...</p>
          ) : filteredTransactions.length === 0 ? (
            <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700/30 text-center">
              <p className="text-gray-400">No transactions found</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {filteredTransactions.map((tx) => (
                <li key={tx.id}>
                  <article className="bg-gray-800/50 rounded-3xl p-4 sm:p-6 border border-gray-700/30 hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                            tx.type === "send"
                              ? "bg-red-500/20"
                              : "bg-green-500/20"
                          }`}
                        >
                          {tx.type === "send" ? (
                            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                          ) : (
                            <ArrowDownLeft className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                          )}
                        </div>
                        <img
                          src={getTokenIcon(tx.token)}
                          alt={`${tx.token} icon`}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold capitalize text-sm sm:text-base">
                              {tx.type}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                tx.status === "completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {tx.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm truncate">
                            {tx.type === "send" ? `To: ${tx.to}` : `From: ${tx.from}`}
                          </p>
                          <time className="text-gray-500 text-xs hidden sm:block">
                            {tx.timestamp}
                          </time>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold text-sm sm:text-lg ${
                            tx.type === "send" ? "text-red-400" : "text-green-400"
                          }`}
                        >
                          {tx.type === "send" ? "-" : "+"}
                          {tx.amount} {tx.token}
                        </p>
                        <button
                          className="text-gray-400 text-xs cursor-pointer hover:text-white transition-colors hidden sm:block"
                          title={`Hash: ${tx.hash}`}
                          onClick={() => window.open(`${import.meta.env.VITE_EXPLORER_URL}/txn/${tx.hash}`, "_blank")}
                        >
                          View on Explorer
                        </button>
                      </div>
                    </div>
                    <time className="text-gray-500 text-xs mt-2 sm:hidden block">
                      {tx.timestamp}
                    </time>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
