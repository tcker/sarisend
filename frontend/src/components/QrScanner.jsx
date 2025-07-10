import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";


const QrScanner = ({ onScan, onClose }) => {
  const scannerRef = useRef(null);
  const qrCodeInstance = useRef(null);
  const navigate = useNavigate();

  const stopScanner = async () => {
    if (qrCodeInstance.current) {
      try {
        // Check if scanner is running before stopping
        const state = qrCodeInstance.current.getState();
        if (state === Html5Qrcode.STATE_SCANNING) {
          await qrCodeInstance.current.stop();
        }
        // Clear the scanner
        qrCodeInstance.current.clear();
        qrCodeInstance.current = null;
      } catch (e) {
        console.warn("Failed to stop scanner:", e);
        // Force cleanup even if stop fails
        try {
          qrCodeInstance.current = null;
        } catch (clearError) {
          console.warn("Failed to clear scanner:", clearError);
        }
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

          // Stop scanner before navigating
          stopScanner()
            .catch((error) => console.warn("Error stopping scanner:", error))
            .finally(() => {
              navigate('/payment', { state: { scannedData: raw } });
              onClose?.();
              onScan?.(raw);
            });
        },
        (error) => {
          // Handle decode errors (optional)
        }
      );
    } catch (err) {
      console.error("Camera access failed:", err);
    }
  };

  startScanner();

  // ✅ Correct async cleanup
  return () => {
    (async () => {
      try {
        await stopScanner();
      } catch (err) {
        console.warn("Error stopping scanner on cleanup:", err);
      }
    })();
  };
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
        onClick={async () => {
          await stopScanner();
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
