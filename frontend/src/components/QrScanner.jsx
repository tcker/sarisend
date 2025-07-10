import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const QrScanner = ({ onClose, onScan }) => {
  const scannerRef = useRef(null);
  const qrCodeInstance = useRef(null);
  const navigate = useNavigate();

  const stopScanner = async () => {
    if (qrCodeInstance.current?.stop) {
      try {
        await qrCodeInstance.current.stop();
        await qrCodeInstance.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  useEffect(() => {
    const startScanner = async () => {
      if (!scannerRef.current) return;
      qrCodeInstance.current = new Html5Qrcode(scannerRef.current.id);

      try {
        await qrCodeInstance.current.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            const raw = decodedText.trim();
            stopScanner();
            navigate('/payment', { state: { scannedData: raw } });
            onClose();
            if (onScan) onScan(raw);
          }
        );
      } catch (err) {
        console.error('QR scanner error:', err);
      }
    };  

    startScanner();
    return () => {
      stopScanner();
    };
  }, [onScan, navigate, onClose]);

  useEffect(() => {
    window.addEventListener('beforeunload', stopScanner);
    return () => window.removeEventListener('beforeunload', stopScanner);
  }, []);

  return (
    <div className="fixed inset-0 z-50">
      {/* Dimmed background */}
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Scanner feed */}
      <div
        id="qr-scanner"
        ref={scannerRef}
        className="absolute inset-0 w-full h-full z-10"
      />

      {/* Scanner frame */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="w-64 h-64 border-4 border-green-500 rounded-lg relative shadow-[0_0_30px_5px_rgba(34,197,94,0.7)]">
          <div className="absolute w-6 h-6 border-t-4 border-l-4 border-green-500 top-0 left-0" />
          <div className="absolute w-6 h-6 border-t-4 border-r-4 border-green-500 top-0 right-0" />
          <div className="absolute w-6 h-6 border-b-4 border-l-4 border-green-500 bottom-0 left-0" />
          <div className="absolute w-6 h-6 border-b-4 border-r-4 border-green-500 bottom-0 right-0" />
        </div>
      </div>

      {/* Close button */}
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
