import { useEffect, useState } from "react";

const NODE_URL = "https://fullnode.mainnet.aptoslabs.com/v1";

export function useTransactionHistory(walletAddress) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${NODE_URL}/accounts/${walletAddress}/transactions?limit=50`);
        const data = await res.json();

        const parsed = data
          .filter(tx => tx.type === "user_transaction" && tx.payload?.arguments?.length >= 2)
          .map(tx => {
            const isSender = tx.sender.toLowerCase() === walletAddress.toLowerCase();
            const [to, amount] = tx.payload.arguments;

            return {
              id: tx.hash,
              hash: tx.hash,
              type: isSender ? "send" : "receive",
              from: tx.sender,
              to,
              amount: (Number(amount) / 1e8).toFixed(2),
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
