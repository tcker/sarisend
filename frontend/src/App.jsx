import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Welcome from './pages/welcome'
import TokenInfo from './pages/tokenInfo'
import TransHisto from './pages/transHisto'
import SentConfirm from './pages/sentConfirm'
import Terms from './pages/terms'
import About from './pages/about'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/token-info" element={<TokenInfo />} />
        <Route path="/transaction-history" element={<TransHisto />} />
        <Route path="/sent-confirm" element={<SentConfirm />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

// import { useState, useRef, useEffect } from 'react'
// import { Routes, Route } from 'react-router-dom'
// import QrScanner from './components/QrScanner'
// import QRCode from 'qrcode'
// import Welcome from './pages/welcome'
// import TokenInfo from './pages/tokenInfo'
// import TransHisto from './pages/transHisto'
// import SentConfirm from './pages/sentConfirm'
// import Terms from './pages/terms'
// import About from './pages/about'

// const NODE_URL = import.meta.env.VITE_NODE_URL
// const MODULE_ADDRESS = import.meta.env.VITE_MODULE_ADDRESS
// const FUNCTION_NAME = `${MODULE_ADDRESS}::sarisend::send_payment`

// function Home() {
//   const [wallet, setWallet] = useState('')
//   const [receiver, setReceiver] = useState('')
//   const [amount, setAmount] = useState('')
//   const [scanning, setScanning] = useState(false)
//   const canvasRef = useRef(null)

//   useEffect(() => {
//     if (wallet && canvasRef.current) {
//       QRCode.toCanvas(canvasRef.current, wallet, { width: 180 }, (err) => {
//         if (err) console.error(err)
//       })
//     }
//   }, [wallet])

//   const connectWallet = async () => {
//     if (!window.aptos) return alert('Petra Wallet not found')
//     try {
//       const res = await window.aptos.connect()
//       setWallet(res.address)
//     } catch (e) {
//       alert('Failed to connect Petra Wallet')
//     }
//   }

//   const sendAPT = async () => {
//     if (!receiver || !amount) return alert('Missing receiver or amount')

//     const payload = {
//       type: 'entry_function_payload',
//       function: FUNCTION_NAME,
//       arguments: [receiver, amount],
//       type_arguments: [],
//     }

//     try {
//       const tx = await window.aptos.signAndSubmitTransaction(payload)

//       let confirmed = false
//       while (!confirmed) {
//         const res = await fetch(`${NODE_URL}/transactions/by_hash/${tx.hash}`)
//         const json = await res.json()

//         if (json.success) {
//           alert('APT sent!')
//           confirmed = true
//         } else if (json.vm_status?.includes('aborted') || json.code === 404) {
//           await new Promise((r) => setTimeout(r, 1500))
//         } else {
//           alert('TX failed')
//           break
//         }
//       }
//     } catch (e) {
//       console.error(e)
//       alert('Transaction failed')
//     }
//   }

//   return (
//     <div className="container">
//       <h1>SariSend QR</h1>

//       {!wallet ? (
//         <button onClick={connectWallet}>Connect Petra Wallet</button>
//       ) : (
//         <>
//           <p>Connected as:</p>
//           <p style={{ fontSize: '0.8rem' }}>{wallet}</p>

//           <h3>Receive APT</h3>
//           <canvas ref={canvasRef} />

//           <h3>Send APT</h3>

//           {scanning ? (
//             <QrScanner
//               onScan={(text) => {
//                 setReceiver(text)
//                 setScanning(false)
//               }}
//               onClose={() => setScanning(false)}
//             />
//           ) : (
//             <button onClick={() => setScanning(true)}>Scan QR for Address</button>
//           )}

//           <input
//             type="text"
//             placeholder="Receiver Address"
//             value={receiver}
//             onChange={(e) => setReceiver(e.target.value)}
//           />

//           <input
//             type="number"
//             placeholder="Amount in octas (1 APT = 100000000)"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />

//           <button onClick={sendAPT}>Send APT</button>
//         </>
//       )}
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/welcome" element={<Welcome />} />
//       <Route path="/token-info" element={<TokenInfo />} />
//       <Route path="/transaction-history" element={<TransHisto />} />
//       <Route path="/sent-confirm" element={<SentConfirm />} />
//       <Route path="/terms" element={<Terms />} />
//       <Route path="/about" element={<About />} />
//     </Routes>
//   )
// }
