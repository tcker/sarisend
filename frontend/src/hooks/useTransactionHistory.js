import { useEffect, useState } from "react";

const NODE_URL = import.meta.env.VITE_NODE_URL;

export function useTransactionHistory(walletAddress) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${NODE_URL}/accounts/${walletAddress}/transactions?limit=50`);
        const data = await res.json();

        const parsed = data
          .filter(tx => tx.type === "user_transaction")
          .map(tx => {
            const isSender = tx.sender === walletAddress;
            const payloadArgs = tx.payload?.arguments || [];
            return {
              id: tx.hash,
              hash: tx.hash,
              type: isSender ? "send" : "receive",
              from: tx.sender,
              to: payloadArgs[0] || "Unknown",
              amount: (Number(payloadArgs[1]) / 1e8).toFixed(2),
              token: "APT",
              timestamp: new Date(Number(tx.timestamp) / 1000).toLocaleString(),
              status: tx.success ? "completed" : "failed",
            };
          });

        setTransactions(parsed.reverse());
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [walletAddress]);

  return { transactions, loading };
}
