import React, { useState, useRef, useEffect } from "react";
import { QrCode, Send, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/icon";
import QrScanner from "../components/QrScanner";
import QRCode from "qrcode";
// import user from "../assets/userPfp.jpg";
import menu from '../assets/Menu Button.png'
import Ellipsis from "../assets/Ellipse.png";
import Token from "../components/token";
import Ads from "../components/ads";
import Sidebar from "../components/Sidebar";
import WalletBalance from "../components/WalletBalance";

const NODE_URL = import.meta.env.VITE_NODE_URL;
const MODULE_ADDRESS = import.meta.env.VITE_MODULE_ADDRESS;
const FUNCTION_NAME = `${MODULE_ADDRESS}::sarisend::send_payment`;

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState(""); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    const connectedAt = localStorage.getItem("connectedAt");

    if (storedWallet && connectedAt) {
      const now = Date.now();
      const diff = now - Number(connectedAt);
      if (diff < 5 * 60 * 1000) {
        setWallet(storedWallet);
        setTimeout(() => {
          setWallet("");
          localStorage.removeItem("wallet");
          localStorage.removeItem("connectedAt");
        }, 5 * 60 * 1000 - diff);
      } else {
        localStorage.removeItem("wallet");
        localStorage.removeItem("connectedAt");
      }
    }
  }, []);

  useEffect(() => {
    if (wallet && canvasRef.current && mode === "receive") {
      QRCode.toCanvas(canvasRef.current, wallet, { width: 340 }, (err) => {
        if (err) console.error(err);
      });
    }
  }, [wallet, mode]);

  const disconnectWallet = async () => {
    setWallet("");
    localStorage.removeItem("wallet");
    localStorage.removeItem("connectedAt");

    if (window.aptos?.disconnect) {
      try {
        await window.aptos.disconnect(); 
      } catch (err) {
        console.warn("Petra disconnect not supported:", err);
      }
    }

    navigate("/"); // Redirect to root after disconnect
  };

  const connectWallet = async () => {
    if (!window.aptos) return alert("Petra Wallet not found");
      const res = await window.aptos.connect();
      setWallet(res.address);
      localStorage.setItem("wallet", res.address);
      localStorage.setItem("connectedAt", Date.now().toString());
    }
  //     setTimeout(() => {
  //       setWallet("");
  //       localStorage.removeItem("wallet");
  //       localStorage.removeItem("connectedAt");
  //     }, 5 * 60 * 1000);
  //   } catch (e) {
  //     alert("Failed to connect Petra Wallet");
  //   }
  // };

  // const sendAPT = async () => {
  //   if (!receiver || !amount) return alert("Missing receiver or amount");

  //   const payload = {
  //     type: "entry_function_payload",png
  //     function: FUNCTION_NAME,
  //     arguments: [receiver, amount],
  //     type_arguments: [],
  //   };

  //   try {
  //     const tx = await window.aptos.signAndSubmitTransaction(payload);
  //     let confirmed = false;

  //     while (!confirmed) {
  //       const res = await fetch(`${NODE_URL}/transactions/by_hash/${tx.hash}`);
  //       const json = await res.json();

  //       if (json.success) {
  //         alert("APT sent!");
  //         confirmed = true;
  //       } else if (json.vm_status?.includes("aborted") || json.code === 404) {
  //         await new Promise((r) => setTimeout(r, 1500));
  //       } else {
  //         alert("TX failed");
  //         break;
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //     alert("Transaction failed");
  //   }
  // };

  return (
    <main className="min-h-screen mx-4 p-4 relative overflow-hidden">
      <div className="absolute top-[-6rem]">
        <img src={Ellipsis} alt="Background decoration" className="w-4xl h-4xl object-contain" />
      </div>

      <header className="relative flex items-center justify-between mb-8 pt-4">
        <div onClick={() => setIsSidebarOpen(true)} className="cursor-pointer">
          <UserProfile profileImage={menu} walletAddress={wallet} />
        </div>

        {!wallet ? (
          <button
            onClick={connectWallet}
            className="bg-green-500 text-black rounded-full px-6 py-2 font-mono shadow-md shadow-green-500/80 hover:shadow-green-500/90 transition-all duration-200"
          >
            Connect Wallet
          </button>
        ) : (
          <span className="text-green-500 text-sm">Connected</span>
        )}
      </header>

      <section className="relative z-10 flex-col items-center gap-2 mb-4">
        <p>Balance</p>
        <h1 className="text-4xl text-green-400">
          {wallet ? <WalletBalance address={wallet} /> : "$--.--"}
        </h1>
      </section>

      {mode === "scan" && (
        <QrScanner
          onScan={(text) => {
            setReceiver(text);
            setMode("send");
          }}
          onClose={() => setMode("")}
        />
      )}

      <section className="relative z-10 bg-gradient-to-b from-[#FFFDFD]/40 via-[#FFFDFD]/20 to-[#FFFFFF]/0 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 mb-6 mt-10">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setMode("scan")}
        >
          <div className="relative mb-4">
            <div className="w-30 h-30 bg-gray-800 rounded-lg flex items-center justify-center">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-green-500 rounded-tl-lg"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-green-500 rounded-tr-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-green-500 rounded-bl-lg"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-green-500 rounded-br-lg"></div>
          </div>
          <span className="text-green-500 font-medium">Scan QR</span>
        </div>
      </section>

      <Ads />
      <Token />

      {isSidebarOpen && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          walletAddress={wallet}
          disconnectWallet={disconnectWallet}
          isMerchant={false} // Regular user, not merchant
        />
      )}
    </main>
  );
}
