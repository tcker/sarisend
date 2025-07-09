import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X } from "lucide-react";

const QrScanner = ({ onScan, onClose }) => {
  const scannerRef = useRef(null);
  const qrCodeInstance = useRef(null);

  const stopScanner = async () => {
    if (qrCodeInstance.current) {
      try {
        await qrCodeInstance.current.stop();
        await qrCodeInstance.current.clear();
        qrCodeInstance.current = null;
      } catch (e) {
        console.warn("Failed to stop scanner:", e);
      }
    }
  };

  useEffect(() => {
    const startScanner = async () => {
      if (!scannerRef.current) return;

      qrCodeInstance.current = new Html5Qrcode(scannerRef.current.id);

      try {
        await qrCodeInstance.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            const raw = decodedText.trim();
            let address = null;

            if (/^0x[a-fA-F0-9]{32,}$/.test(raw)) address = raw;

            const uriMatch = raw.match(/^aptos:(0x[a-fA-F0-9]{32,})$/);
            if (uriMatch) address = uriMatch[1];

            try {
              const json = JSON.parse(raw);
              if (json?.address?.startsWith("0x")) address = json.address;
            } catch {}

            if (address) {
              stopScanner();
              onScan(address);
            } else {
              console.warn("Scanned text is not a valid Aptos address:", raw);
            }
          },
          (error) => {
            // Optional: handle scan errors
          }
        );
      } catch (err) {
        console.error("Camera access failed:", err);
      }
    };

    startScanner();
    return () => stopScanner();
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div id="qr-scanner" ref={scannerRef} className="w-full h-full" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 border-4 border-green-500 rounded-lg relative">
          <div className="absolute w-6 h-6 border-t-4 border-l-4 border-green-500 top-0 left-0" />
          <div className="absolute w-6 h-6 border-t-4 border-r-4 border-green-500 top-0 right-0" />
          <div className="absolute w-6 h-6 border-b-4 border-l-4 border-green-500 bottom-0 left-0" />
          <div className="absolute w-6 h-6 border-b-4 border-r-4 border-green-500 bottom-0 right-0" />
        </div>
      </div>

      <button
        onClick={() => {
          stopScanner();
          onClose();
        }}
        className="absolute top-4 right-4 z-50 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default QrScanner;
