import { useEffect, useState } from "react";

const NODE_URL = import.meta.env.VITE_NODE_URL;

export default function WalletBalance({ address }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (!address) return;

    const fetchBalance = async () => {
      try {
        const res = await fetch(`${NODE_URL}/accounts/${address}/resources`);
        const resources = await res.json();

        const aptosCoinStore = resources.find((r) =>
          r.type.includes("0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>")
        );

        if (aptosCoinStore && aptosCoinStore.data?.coin?.value) {
          const rawValue = aptosCoinStore.data.coin.value;
          const apt = parseFloat(rawValue) / 1e8;
          setBalance(apt.toFixed(4));
        } else {
          setBalance("0.0000");
        }
      } catch (err) {
        console.error("Failed to fetch balance:", err);
        setBalance("0.0000");
      }
    };

    fetchBalance();
  }, [address]);

  return <span>{balance !== null ? `${balance}` : "Loading..."}</span>;
}
